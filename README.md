# 📄 PDF Folder to Markdowns

Convert a folder of PDFs into a folder of Markdown files with embedded PDFs.  
This plugin is useful for users who want to migrate their PDF notes from different apps (e.g., Boox) or organize their reference materials inside **Obsidian**.

## ✨ Features

-   Convert all PDFs in a selected folder into individual Markdown files.
-   Each Markdown file will embed its corresponding PDF.
-   Optionally rename the input folder after conversion.
-   Configurable suffix for renaming the input folder.
-   Respect Obsidian's attachment settings to move PDFs next to the generated note.
-   Automatically run an Obsidian template (core Templates or Templater) after each note is created.

## ⚙️ Settings

-   **Rename Input Folder**: If enabled, the input folder will be renamed by adding `_NOTES` or the configured suffix after conversion.
-   **Input Folder Suffix**: The suffix to add to the input folder after conversion.
-   **Use Obsidian Attachment Settings**: When enabled, PDFs are moved according to the "Files & Links" attachment preferences and the notes are stored beside them.
-   **Apply Template After Conversion**: Runs a template on each generated note. The plugin prefers the community Templater plugin when available, otherwise it falls back to the core Templates plugin.
-   **Template Name or Path**: Provide the template filename or full path (case-sensitive). The `.md` extension is optional.

## 🚀 Usage

1. **Right-click** on any folder containing PDFs inside Obsidian.
2. Select **"Convert PDFs to Markdown"**.
3. The plugin will:
    - Create a new folder with the same name as the original (unless using attachment settings).
    - Convert each PDF into a Markdown file.
    - Embed the corresponding PDF inside the Markdown file.
    - Optionally apply attachment settings and templates depending on your configuration.
    - If the **Rename Input Folder** setting is enabled, the original folder will be renamed with the configured suffix.

## 🔧 Installation

1. Download and place this plugin inside your Obsidian plugins folder.
2. Enable **"PDF Folder to Markdown"** from **Settings > Community Plugins**.
3. Adjust settings as needed under **Settings > PDF Folder to Markdown**.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and ensure the code follows best practices.
4. Submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📝 Acknowledgements

-   [Obsidian](https://obsidian.md/)

## 📚 API References

-   [Obsidian API](https://github.com/obsidianmd/obsidian-api)

---

**Created with ❤️ for the Obsidian community.**

#### **Antiqua et Nova: Ad Maiorem Dei Gloriam et in Honorem Beatissimae Virginis Mariae.**

> _"Sic luceat lux vestra coram hominibus, ut videant opera vestra bona et glorificent Patrem vestrum, qui in caelis est."_  
> — _Matthaeus 5:16_
