export const noticeMessages: string[] = [];

export class Notice {
	constructor(message: string) {
		noticeMessages.push(message);
	}
}

export class TFile {}

export class App {
	workspace = { on: () => {} };
}

export class Plugin {
	public app: App;

	constructor(app?: App) {
		this.app = app ?? new App();
	}

	async onload() {}
	async loadSettings() {}
	async saveSettings() {}
	registerEvent() {}
	addSettingTab() {}
}

export const getLanguage = () => "en";

export class PluginSettingTab {
	app: App;
	plugin: Plugin;
	containerEl: HTMLElement;

	constructor(app: App, plugin: Plugin) {
		this.app = app;
		this.plugin = plugin;
		this.containerEl = {
			innerHTML: "",
			empty() {
				this.innerHTML = "";
			},
		} as unknown as HTMLElement;
	}

	display(): void {}
}

class ToggleComponent {
	private value = false;
	setValue(val: boolean) {
		this.value = val;
		return this;
	}
	onChange(callback: (value: boolean) => void) {
		callback(this.value);
		return this;
	}
}

class TextComponent {
	private value = "";
	setValue(val: string) {
		this.value = val;
		return this;
	}
	onChange(callback: (value: string) => void) {
		callback(this.value);
		return this;
	}
}

export class Setting {
	constructor(public containerEl: HTMLElement) {}
	setName() {
		return this;
	}
	setDesc() {
		return this;
	}
	addToggle(callback: (toggle: ToggleComponent) => void) {
		callback(new ToggleComponent());
		return this;
	}
	addText(callback: (text: TextComponent) => void) {
		callback(new TextComponent());
		return this;
	}
}
