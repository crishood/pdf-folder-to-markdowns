import { App, PluginSettingTab, Setting } from "obsidian";
import PDFFolderToMarkdowns from "./main";
import { TRANSLATIONS } from "./constants/language.constants";

export class PDFFolderToMarkdownsSettingTab extends PluginSettingTab {
	plugin: PDFFolderToMarkdowns;

	constructor(app: App, plugin: PDFFolderToMarkdowns) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName(TRANSLATIONS[this.plugin.language].RENAME_INPUT_FOLDER)
			.setDesc(
				TRANSLATIONS[this.plugin.language]
					.RENAME_INPUT_FOLDER_DESCRIPTION
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.renameInputFolder)
					.onChange(async (value) => {
						this.plugin.settings.renameInputFolder = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(TRANSLATIONS[this.plugin.language].INPUT_FOLDER_SUFFIX)
			.setDesc(
				TRANSLATIONS[this.plugin.language]
					.INPUT_FOLDER_SUFFIX_DESCRIPTION
			)
			.addText((text) =>
				text
					.setValue(this.plugin.settings.inputFolderSuffix)
					.onChange(async (value) => {
						this.plugin.settings.inputFolderSuffix = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl).setDesc(
			TRANSLATIONS[this.plugin.language].DISCLAIMER
		);
	}
}
