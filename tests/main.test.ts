import { describe, it, expect, vi, beforeEach } from "vitest";
import PDFFolderToMarkdowns from "../main";
import { DEFAULT_SETTINGS, Settings } from "../models/settings.model";
import { noticeMessages } from "./mocks/obsidian";

type MockVaultFile = {
	path: string;
	name: string;
	basename: string;
	extension: string;
};

const createPlugin = (
	app: any,
	settingsOverrides: Partial<Settings>
): PDFFolderToMarkdowns => {
	const plugin = new PDFFolderToMarkdowns(app as any, {} as any);
	plugin.language = "en";
	plugin.settings = {
		...DEFAULT_SETTINGS,
		...settingsOverrides,
	};
	return plugin;
};

describe("convertPDFsToMarkdown", () => {
	beforeEach(() => {
		noticeMessages.length = 0;
	});

	it("moves PDFs using Obsidian attachment settings when enabled", async () => {
		const pdfFile: MockVaultFile = {
			path: "Source/sample.pdf",
			name: "sample.pdf",
			basename: "sample",
			extension: "pdf",
		};
		const mockMdFile = { path: "Source/sample.md" };

		const adapterExists = vi.fn().mockResolvedValue(false);
		const vault = {
			adapter: { exists: adapterExists },
			createFolder: vi.fn().mockResolvedValue(undefined),
			getFiles: () => [pdfFile],
			create: vi.fn().mockResolvedValue(mockMdFile),
			modify: vi.fn().mockResolvedValue(undefined),
			getAbstractFileByPath: vi.fn(),
		};
		const fileManager = {
			renameFile: vi.fn().mockResolvedValue(undefined),
			getAvailablePathForAttachment: vi
				.fn()
				.mockResolvedValue("Attachments/sample.pdf"),
		};
		const app = {
			vault,
			fileManager,
			workspace: { on: vi.fn() },
		};

		const plugin = createPlugin(app, {
			renameInputFolder: false,
			useAttachmentSettings: true,
		});

		await plugin.convertPDFsToMarkdown("Source");

		expect(fileManager.getAvailablePathForAttachment).toHaveBeenCalledWith(
			"sample.pdf",
			"Source/sample.md"
		);
		expect(fileManager.renameFile).toHaveBeenCalledWith(
			pdfFile,
			"Attachments/sample.pdf"
		);
		expect(vault.modify).toHaveBeenCalledWith(
			mockMdFile,
			"![[Attachments/sample.pdf]]"
		);
		expect(vault.createFolder).not.toHaveBeenCalled();
	});

	it("keeps PDFs beside markdown files when attachment settings are disabled", async () => {
		const pdfFile: MockVaultFile = {
			path: "Research_NOTES/doc.pdf",
			name: "doc.pdf",
			basename: "doc",
			extension: "pdf",
		};
		const adapterExists = vi.fn().mockResolvedValue(false);
		const folder = { path: "Research" };

		const vault = {
			adapter: { exists: adapterExists },
			createFolder: vi.fn().mockResolvedValue(undefined),
			getFiles: () => [pdfFile],
			create: vi.fn().mockResolvedValue(undefined),
			modify: vi.fn().mockResolvedValue(undefined),
			getAbstractFileByPath: vi.fn().mockReturnValue(folder),
		};
		const fileManager = {
			renameFile: vi.fn().mockResolvedValue(undefined),
			getAvailablePathForAttachment: vi.fn(),
		};
		const app = {
			vault,
			fileManager,
			workspace: { on: vi.fn() },
		};

		const plugin = createPlugin(app, {
			useAttachmentSettings: false,
			renameInputFolder: true,
			inputFolderSuffix: "_NOTES",
		});

		await plugin.convertPDFsToMarkdown("Research");

		expect(fileManager.renameFile).toHaveBeenCalledWith(
			folder,
			"Research_NOTES"
		);
		expect(fileManager.renameFile).toHaveBeenCalledTimes(1);
		expect(vault.createFolder).toHaveBeenCalledWith("Research");
		expect(vault.create).toHaveBeenCalledWith(
			"Research/doc.md",
			"![[Research_NOTES/doc.pdf]]"
		);
		expect(vault.modify).not.toHaveBeenCalled();
	});
});
