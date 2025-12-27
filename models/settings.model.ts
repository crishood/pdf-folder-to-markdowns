export interface Settings {
	inputFolderSuffix: string;
	renameInputFolder: boolean;
	useAttachmentSettings: boolean;
	applyTemplateAfterCreation: boolean;
	templateNameOrPath: string;
}

const DEFAULT_INPUT_FOLDER_SUFFIX: string = "_NOTES";
export const DEFAULT_SETTINGS: Settings = {
	inputFolderSuffix: DEFAULT_INPUT_FOLDER_SUFFIX,
	renameInputFolder: true,
	useAttachmentSettings: false,
	applyTemplateAfterCreation: false,
	templateNameOrPath: "",
};
