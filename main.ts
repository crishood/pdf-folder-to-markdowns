import {
	Plugin,
	TFile,
	Notice,
	getLanguage,
	MarkdownView,
	FileSystemAdapter,
} from "obsidian";
import {
	SupportedLanguages,
	TRANSLATIONS,
} from "./constants/language.constants";
import { Settings, DEFAULT_SETTINGS } from "./models/settings.model";
import { PDFFolderToMarkdownsSettingTab } from "./settings-tab";
const DEFAULT_LANGUAGE: SupportedLanguages = "en";

interface MinimalTemplaterPlugin {
	settings: {
		templates_folder: string;
	};
	templater: {
		append_template_to_active_file: (templateFile: TFile) => Promise<void>;
	};
}

type CoreTemplatesPlugin = {
	enabled: boolean;
	instance: {
		insertTemplate: (templateFile: TFile) => Promise<void>;
	};
};

export default class PDFFolderToMarkdowns extends Plugin {
	public settings: Settings = DEFAULT_SETTINGS;
	public language: SupportedLanguages;
	private templateErrorShown = false;

	async onload() {
		await super.onload();
		await this.loadSettings();
		this.language =
			(getLanguage() as SupportedLanguages) || DEFAULT_LANGUAGE;
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, folder) => {
				if (folder instanceof TFile || !folder) return;
				menu.addItem((item) => {
					item.setTitle(
						TRANSLATIONS[this.language].CONVERT_PDFS_TO_MARKDOWN
					).onClick(() => this.convertPDFsToMarkdown(folder.path));
				});
			})
		);

		this.addSettingTab(new PDFFolderToMarkdownsSettingTab(this.app, this));
	}

	async convertPDFsToMarkdown(inputFolder: string) {
		try {
			this.templateErrorShown = false;
			const vault = this.app.vault;
			const folderName = inputFolder.split("/").pop();

			if (!folderName) {
				new Notice(TRANSLATIONS[this.language].INVALID_FOLDER_PATH);
				return;
			}

			// Calculate folder paths based on settings
			const { renamedInputFolder, outputFolder } =
				this.settings.useAttachmentSettings
					? { renamedInputFolder: inputFolder, outputFolder: inputFolder }
					: this._calculateFolderPaths(inputFolder);

			// Rename input folder (only if not using attachment settings)
			if (this.settings.renameInputFolder && !this.settings.useAttachmentSettings) {
				try {
					const folder =
						this.app.vault.getAbstractFileByPath(inputFolder);
					if (!folder) throw new Error("Folder not found");
					await this.app.fileManager.renameFile(
						folder,
						renamedInputFolder
					);
				} catch (error) {
					new Notice(TRANSLATIONS[this.language].FOLDER_RENAME_ERROR);
					return;
				}
			}

			// Ensure the output folder exists (only if not using attachment settings)
			if (!this.settings.useAttachmentSettings) {
				try {
					if (!(await vault.adapter.exists(outputFolder))) {
						await vault.createFolder(outputFolder);
					}
				} catch (error) {
					new Notice(TRANSLATIONS[this.language].FOLDER_CREATE_ERROR);
					return;
				}
			}

			// Get PDF files
			const files = vault
				.getFiles()
				.filter(
					(file) =>
						file.path.startsWith(renamedInputFolder + "/") &&
						file.extension === "pdf"
				);

			if (files.length === 0) {
				new Notice(TRANSLATIONS[this.language].NO_PDFS_FOUND);
				return;
			}

			// Create markdown files
			for (const file of files) {
				try {
					let mdFilePath: string;
					let pdfPath: string = file.path;

					if (this.settings.useAttachmentSettings) {
						const mdFilePathWithAttachments = `${outputFolder}/${file.basename}.md`;

						if (await vault.adapter.exists(mdFilePathWithAttachments)) {
							continue;
						}

						const mdFile = await vault.create(mdFilePathWithAttachments, "");
						const attachmentPath = await this.app.fileManager.getAvailablePathForAttachment(
							file.name,
							mdFile.path
						);

						await this.app.fileManager.renameFile(file, attachmentPath);
						pdfPath = attachmentPath;

						await this.applyTemplateIfNeeded(mdFile);
						await this.replacePdfPlaceholders(mdFile, pdfPath);
						await this.ensurePdfEmbed(mdFile, pdfPath);
					} else {
						mdFilePath = `${outputFolder}/${file.basename}.md`;

						if (await vault.adapter.exists(mdFilePath)) {
							continue;
						}
						const mdFile = await vault.create(mdFilePath, "");
						await this.applyTemplateIfNeeded(mdFile);
						await this.replacePdfPlaceholders(mdFile, pdfPath);
						await this.ensurePdfEmbed(mdFile, pdfPath);
					}
				} catch (error) {
					new Notice(
						TRANSLATIONS[this.language].FILE_CREATE_ERROR(
							file.basename
						)
					);
				}
			}

			new Notice(TRANSLATIONS[this.language].PDFS_CONVERTED_TO_MARKDOWN);
		} catch (error) {
			new Notice(TRANSLATIONS[this.language].UNEXPECTED_ERROR);
			console.error("PDF conversion error:", error);
		}
	}

	private _calculateFolderPaths(inputFolder: string): {
		renamedInputFolder: string;
		outputFolder: string;
	} {
		const hasSuffix = inputFolder.includes(this.settings.inputFolderSuffix);
		const shouldRename =
			this.settings.renameInputFolder &&
			!!this.settings.inputFolderSuffix;

		if (hasSuffix) {
			const renamedInputFolder = inputFolder;
			const outputFolder = shouldRename
				? renamedInputFolder.replace(
						this.settings.inputFolderSuffix,
						""
				  )
				: renamedInputFolder;
			return { renamedInputFolder, outputFolder };
		}

		const renamedInputFolder = shouldRename
			? `${inputFolder}${this.settings.inputFolderSuffix}`
			: inputFolder;
		const outputFolder = inputFolder;

		return { renamedInputFolder, outputFolder };
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private async applyTemplateIfNeeded(note: TFile): Promise<void> {
		if (!this.settings.applyTemplateAfterCreation) {
			return;
		}

		const templateName = (this.settings.templateNameOrPath || "").trim();
		if (!templateName) {
			return;
		}

		try {
			if (await this.applyWithTemplater(note, templateName)) {
				return;
			}

			if (await this.applyWithCoreTemplates(note, templateName)) {
				return;
			}

			this.handleTemplateError(
				templateName,
				new Error("No template engine available")
			);
		} catch (error) {
			this.handleTemplateError(templateName, error);
		}
	}

	private async applyWithTemplater(
		note: TFile,
		templateName: string
	): Promise<boolean> {
		const templater = this.getTemplaterPlugin();
		if (!templater) return false;

		const folder = templater.settings.templates_folder || undefined;
		const templateFile = this.findTemplateFileByName(templateName, folder);
		if (!templateFile) {
			throw new Error(
				`Templater template "${templateName}" was not found.`
			);
		}

		await this.openNoteInActiveLeaf(note);
		await templater.templater.append_template_to_active_file(templateFile);
		return true;
	}

	private async applyWithCoreTemplates(
		note: TFile,
		templateName: string
	): Promise<boolean> {
		const core = this.getCoreTemplatesPlugin();
		if (!core || !core.enabled) return false;

		const templateFile = this.findTemplateFileByName(templateName);
		if (!templateFile) {
			throw new Error(
				`Core Templates file "${templateName}" was not found.`
			);
		}

		await this.openNoteInActiveLeaf(note);
		await core.instance.insertTemplate(templateFile);
		return true;
	}

	private async openNoteInActiveLeaf(note: TFile): Promise<void> {
		const leaf = this.app.workspace.getLeaf(false);
		await leaf.openFile(note);
		this.app.workspace.setActiveLeaf(leaf, { focus: true });
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view && view.file?.path === note.path) {
			const lastLine = view.editor.lastLine();
			const lastCh = view.editor.getLine(lastLine).length;
			view.editor.setCursor({ line: lastLine, ch: lastCh });
		}
	}

	private findTemplateFileByName(
		template: string,
		folder?: string
	): TFile | null {
		const trimmed = template.trim();
		if (!trimmed) return null;

		const normalized = this.normalizeTemplatePath(trimmed);
		const hasSlash = normalized.includes("/");
		const hasExt = normalized.toLowerCase().endsWith(".md");

		if (hasSlash) {
			const direct = this.app.vault.getAbstractFileByPath(normalized);
			if (direct instanceof TFile) {
				return direct;
			}
		}

		const bareName = hasExt
			? normalized.replace(/\.md$/i, "")
			: normalized;
		const targetName = `${bareName}.md`;
		const prefix = folder
			? folder.endsWith("/")
				? folder
				: `${folder}/`
			: null;

		const lowerTarget = targetName.toLowerCase();
		const lowerBare = bareName.toLowerCase();

		for (const file of this.app.vault.getMarkdownFiles()) {
			if (prefix && !file.path.startsWith(prefix)) continue;
			if (file.name.toLowerCase() === lowerTarget) return file;
			if (file.basename.toLowerCase() === lowerBare) return file;
		}

		return null;
	}

	private normalizeTemplatePath(path: string): string {
		const adapter = this.app.vault.adapter;
		if (adapter instanceof FileSystemAdapter) {
			const basePath = adapter.getBasePath();
			if (path.startsWith(basePath)) {
				const relative = path.slice(basePath.length).replace(/^\//, "");
				return relative;
			}
		}
		return path.startsWith("/") ? path.slice(1) : path;
	}

	private async replacePdfPlaceholders(
		note: TFile,
		pdfPath: string
	): Promise<void> {
		const content = await this.app.vault.read(note);
		const hasPlaceholder = /{{\s*pdf:path\s*}}/i.test(content);
		if (!hasPlaceholder) {
			console.debug(
				"PDF Folder to Markdowns:",
				"No {{pdf:path}} placeholder detected for",
				note.path
			);
			return;
		}
		console.debug(
			"PDF Folder to Markdowns:",
			"Replacing {{pdf:path}} placeholder in",
			note.path,
			"with",
			pdfPath
		);
		const updatedContent = content.replace(/{{\s*pdf:path\s*}}/gi, pdfPath);
		if (updatedContent === content) {
			console.warn(
				"PDF Folder to Markdowns:",
				"Placeholder replacement produced identical content for",
				note.path
			);
		}
		await this.app.vault.modify(note, updatedContent);
	}

	private async ensurePdfEmbed(note: TFile, pdfPath: string): Promise<void> {
		const embedRegex = this.getPdfEmbedRegex(pdfPath);
		const content = await this.app.vault.read(note);
		if (embedRegex.test(content)) {
			return;
		}
		const trimmed = content.replace(/\s+$/, "");
		const prefix = trimmed.length > 0 ? `${trimmed}\n\n` : "";
		const updatedContent = `${prefix}![[${pdfPath}]]\n`;
		await this.app.vault.modify(note, updatedContent);
	}

	private getPdfEmbedRegex(pdfPath: string): RegExp {
		const escaped = this.escapeForRegex(pdfPath);
		return new RegExp(`!\\[\\[${escaped}(\\|[^\\]]+)?\\]\\]`, "i");
	}

	private escapeForRegex(value: string): string {
		return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	private getTemplaterPlugin(): MinimalTemplaterPlugin | null {
		const pluginsApi = (this.app as any).plugins;
		if (!pluginsApi || typeof pluginsApi.getPlugin !== "function") {
			return null;
		}
		return pluginsApi.getPlugin(
			"templater-obsidian"
		) as MinimalTemplaterPlugin | null;
	}

	private getCoreTemplatesPlugin(): CoreTemplatesPlugin | null {
		const anyApp = this.app as any;
		return (anyApp.internalPlugins?.plugins?.["templates"] ?? null) as
			| CoreTemplatesPlugin
			| null;
	}

	private handleTemplateError(templateName: string, error: unknown) {
		console.error("Template apply error:", error);
		if (this.templateErrorShown) return;
		new Notice(
			TRANSLATIONS[this.language].TEMPLATE_APPLY_ERROR(templateName)
		);
		this.templateErrorShown = true;
	}
}
