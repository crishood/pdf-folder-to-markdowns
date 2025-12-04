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
		const t = TRANSLATIONS[this.plugin.language];

		new Setting(containerEl)
			.setHeading()
			.setName(t.FOLDER_SECTION_HEADING);

		new Setting(containerEl)
			.setName(t.RENAME_INPUT_FOLDER)
			.setDesc(t.RENAME_INPUT_FOLDER_DESCRIPTION)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.renameInputFolder)
					.onChange(async (value) => {
						this.plugin.settings.renameInputFolder = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t.INPUT_FOLDER_SUFFIX)
			.setDesc(t.INPUT_FOLDER_SUFFIX_DESCRIPTION)
			.addText((text) =>
				text
					.setValue(this.plugin.settings.inputFolderSuffix)
					.onChange(async (value) => {
						this.plugin.settings.inputFolderSuffix = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl).setDesc(t.DISCLAIMER);

		new Setting(containerEl)
			.setHeading()
			.setName(t.ATTACHMENT_SECTION_HEADING);

		new Setting(containerEl)
			.setName(t.USE_ATTACHMENT_SETTINGS)
			.setDesc(t.USE_ATTACHMENT_SETTINGS_DESCRIPTION)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.useAttachmentSettings)
					.onChange(async (value) => {
						this.plugin.settings.useAttachmentSettings = value;
						await this.plugin.saveSettings();
						this.display();
					})
			);

		new Setting(containerEl)
			.setHeading()
			.setName(t.TEMPLATE_SECTION_HEADING);

		new Setting(containerEl)
			.setName(t.APPLY_TEMPLATE)
			.setDesc(t.APPLY_TEMPLATE_DESCRIPTION)
			.addToggle((toggle) =>
				toggle
					.setValue(
						this.plugin.settings.applyTemplateAfterCreation
					)
					.onChange(async (value) => {
						this.plugin.settings.applyTemplateAfterCreation = value;
						await this.plugin.saveSettings();
						this.display();
					})
			);

		if (this.plugin.settings.applyTemplateAfterCreation) {
			new Setting(containerEl)
				.setName(t.TEMPLATE_NAME)
				.setDesc(t.TEMPLATE_NAME_DESCRIPTION)
				.addText((text) =>
					text
						.setPlaceholder("My Template")
						.setValue(
							this.plugin.settings.templateNameOrPath
						)
						.onChange(async (value) => {
							this.plugin.settings.templateNameOrPath = value;
							await this.plugin.saveSettings();
						})
				);
		}

	}
}
