import { Plugin, TFile, Notice } from "obsidian";

export default class PDFFolderToMarkdowns extends Plugin {
	async onload() {
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, folder) => {
				if (folder instanceof TFile || !folder) return;
				menu.addItem((item) => {
					item.setTitle("Convert PDFs to Markdown").onClick(() =>
						this.convertPDFsToMarkdown(folder.path)
					);
				});
			})
		);
	}

	async convertPDFsToMarkdown(inputFolder: string) {
		const vault = this.app.vault;
		const folderName = inputFolder.split("/").pop();
		let renamedInputFolder = "";
		if (!folderName) return;

		// Rename input folder
		if (!inputFolder.includes("_PDF")) {
			renamedInputFolder = `${inputFolder}_PDF`;
		} else {
			renamedInputFolder = `${inputFolder}`;
		}
		const outputFolder = `${inputFolder}`;

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

		new Notice("PDFs converted to Markdown and folder renamed.");
	}
}
