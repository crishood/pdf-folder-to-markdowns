export interface Settings {
	inputFolderSuffix: string;
	renameInputFolder: boolean;
	useAttachmentSettings: boolean;
}

const DEFAULT_INPUT_FOLDER_SUFFIX: string = "_NOTES";
export const DEFAULT_SETTINGS: Settings = {
	inputFolderSuffix: DEFAULT_INPUT_FOLDER_SUFFIX,
	renameInputFolder: true,
	useAttachmentSettings: false,
};
