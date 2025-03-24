import { Plugin, TFile, Notice, getLanguage } from "obsidian";
import {
	SupportedLanguages,
	TRANSLATIONS,
} from "./constants/language.constants";
import { Settings, DEFAULT_SETTINGS } from "./models/settings.model";
import { PDFFolderToMarkdownsSettingTab } from "./settings-tab";

const DEFAULT_LANGUAGE: SupportedLanguages = "en";

export default class PDFFolderToMarkdowns extends Plugin {
	public settings: Settings = DEFAULT_SETTINGS;
	public language: SupportedLanguages;

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
			const vault = this.app.vault;
			const folderName = inputFolder.split("/").pop();

			if (!folderName) {
				new Notice(TRANSLATIONS[this.language].INVALID_FOLDER_PATH);
				return;
			}

			// Calculate folder paths
			const { renamedInputFolder, outputFolder } =
				this._calculateFolderPaths(inputFolder);

			// Rename input folder
			if (this.settings.renameInputFolder) {
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

			// Ensure the output folder exists
			try {
				if (!(await vault.adapter.exists(outputFolder))) {
					await vault.createFolder(outputFolder);
				}
			} catch (error) {
				new Notice(TRANSLATIONS[this.language].FOLDER_CREATE_ERROR);
				return;
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
				const mdFilePath = `${outputFolder}/${file.basename}.md`;

				try {
					if (await vault.adapter.exists(mdFilePath)) {
						continue; // Skip existing files
					}
					await vault.create(mdFilePath, `![[${file.path}]]`);
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
}
