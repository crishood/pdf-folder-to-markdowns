export type SupportedLanguages = "en" | "es" | "fr" | "de" | "it" | "pt";

export const TRANSLATIONS: Record<
	SupportedLanguages,
	{
		CONVERT_PDFS_TO_MARKDOWN: string;
		PDFS_CONVERTED_TO_MARKDOWN: string;
	}
> = {
	en: {
		CONVERT_PDFS_TO_MARKDOWN: "Convert PDFs to Markdown Folder",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs converted to Markdown Folder",
	},
	es: {
		CONVERT_PDFS_TO_MARKDOWN: "Convertir PDFs a carpeta de Markdown",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs convertidos a carpeta de Markdown",
	},
	fr: {
		CONVERT_PDFS_TO_MARKDOWN: "Convertir PDFs en dossier Markdown",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs convertis en dossier Markdown",
	},
	de: {
		CONVERT_PDFS_TO_MARKDOWN: "PDFs in Markdown-Ordner konvertieren",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs konvertiert in Markdown-Ordner",
	},
	it: {
		CONVERT_PDFS_TO_MARKDOWN: "Convertire PDF in cartella Markdown",
		PDFS_CONVERTED_TO_MARKDOWN: "PDF convertiti in cartella Markdown",
	},
	pt: {
		CONVERT_PDFS_TO_MARKDOWN: "Converter PDFs para pasta de Markdown",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs convertidos para pasta de Markdown",
	},
};
