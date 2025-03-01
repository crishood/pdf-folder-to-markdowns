import { Plugin, TFile, Notice } from "obsidian";
import { SupportedLanguages, TRANSLATIONS } from "./constants/copy.constants";
export default class PDFFolderToMarkdowns extends Plugin {
	private language: SupportedLanguages;
	private inputFolderSuffix: string = "_NOTES";

	async onload() {
		this.language =
			(window.localStorage.getItem("language") as SupportedLanguages) ||
			"en";
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
	}

	async convertPDFsToMarkdown(inputFolder: string) {
		const vault = this.app.vault;
		const folderName = inputFolder.split("/").pop();
		let renamedInputFolder = "";
		let outputFolder = "";
		if (!folderName) return;

		// Rename input folder
		if (inputFolder.includes(this.inputFolderSuffix)) {
			renamedInputFolder = `${inputFolder}`;
			outputFolder = renamedInputFolder.replace(
				this.inputFolderSuffix,
				""
			);
		} else {
			renamedInputFolder = `${inputFolder}${this.inputFolderSuffix}`;
			outputFolder = `${inputFolder}`;
		}

		// Rename input folder
		await vault.adapter.rename(inputFolder, renamedInputFolder);

		// Ensure the output folder exists
		if (!(await vault.adapter.exists(outputFolder))) {
			await vault.createFolder(outputFolder);
		}

		// Get PDF files
		const files = vault
			.getFiles()
			.filter(
				(file) =>
					file.path.startsWith(renamedInputFolder + "/") &&
					file.extension === "pdf"
			);

		for (const file of files) {
			const baseName = file.basename;
			const mdContent = `![[${file.path}]]`;
			const mdFilePath = `${outputFolder}/${baseName}.md`;

			await vault.create(mdFilePath, mdContent);
		}

		new Notice(TRANSLATIONS[this.language].PDFS_CONVERTED_TO_MARKDOWN);
	}
}
