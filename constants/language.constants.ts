export type SupportedLanguages = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt';

export const TRANSLATIONS: Record<
  SupportedLanguages,
  {
    CONVERT_PDFS_TO_MARKDOWN: string;
    PDFS_CONVERTED_TO_MARKDOWN: string;
    RENAME_INPUT_FOLDER: string;
    RENAME_INPUT_FOLDER_DESCRIPTION: string;
    INPUT_FOLDER_SUFFIX: string;
    INPUT_FOLDER_SUFFIX_DESCRIPTION: string;
    DISCLAIMER: string;
    INVALID_FOLDER_PATH: string;
    FOLDER_RENAME_ERROR: string;
    FOLDER_CREATE_ERROR: string;
    NO_PDFS_FOUND: string;
    UNEXPECTED_ERROR: string;
    FILE_CREATE_ERROR: (fileName: string) => string;
  }
> = {
  en: {
    CONVERT_PDFS_TO_MARKDOWN: 'Convert PDFs to Markdown folder',
    PDFS_CONVERTED_TO_MARKDOWN: 'PDFs converted to Markdown folder',
    RENAME_INPUT_FOLDER: 'Rename input folder',
    RENAME_INPUT_FOLDER_DESCRIPTION:
      'Rename the input folder by adding a suffix after conversion',
    INPUT_FOLDER_SUFFIX: 'Input folder suffix',
    INPUT_FOLDER_SUFFIX_DESCRIPTION:
      'Add a suffix to the input folder after conversion (e.g. _PDF)',
    DISCLAIMER:
      "*If there's no suffix, the files will be converted to the root folder",
    INVALID_FOLDER_PATH: 'Invalid folder path',
    FOLDER_RENAME_ERROR: 'Error renaming folder',
    FOLDER_CREATE_ERROR: 'Error creating folder',
    NO_PDFS_FOUND: 'No PDFs found',
    UNEXPECTED_ERROR: 'Unexpected error',
    FILE_CREATE_ERROR: (fileName: string) => `Error creating file ${fileName}`,
  },
  es: {
    CONVERT_PDFS_TO_MARKDOWN: 'Convertir PDFs a carpeta de Markdown',
    PDFS_CONVERTED_TO_MARKDOWN: 'PDFs convertidos a carpeta de Markdown',
    RENAME_INPUT_FOLDER: 'Renombrar carpeta de entrada',
    RENAME_INPUT_FOLDER_DESCRIPTION:
      'Renombrar la carpeta de entrada después de la conversión',
    INPUT_FOLDER_SUFFIX: 'Sufijo de carpeta de entrada',
    INPUT_FOLDER_SUFFIX_DESCRIPTION:
      'Agregar un sufijo a la carpeta de entrada después de la conversión (ej. _PDF)',
    DISCLAIMER:
      '*Si no hay sufijo, los archivos se convertirán a la carpeta raíz.',
    INVALID_FOLDER_PATH: 'Ruta de carpeta inválida',
    FOLDER_RENAME_ERROR: 'Error al renombrar la carpeta',
    FOLDER_CREATE_ERROR: 'Error al crear la carpeta',
    NO_PDFS_FOUND: 'No se encontraron PDFs',
    UNEXPECTED_ERROR: 'Error inesperado',
    FILE_CREATE_ERROR: (fileName: string) =>
      `Error al crear el archivo ${fileName}`,
  },
  fr: {
    CONVERT_PDFS_TO_MARKDOWN: 'Convertir PDFs en dossier Markdown',
    PDFS_CONVERTED_TO_MARKDOWN: 'PDFs convertis en dossier Markdown',
    RENAME_INPUT_FOLDER: "Renombrar dossier d'entrée",
    RENAME_INPUT_FOLDER_DESCRIPTION:
      "Renombrar el dossier d'entrée después de la conversión",
    INPUT_FOLDER_SUFFIX: 'Sufijo de carpeta de entrada',
    INPUT_FOLDER_SUFFIX_DESCRIPTION:
      "Ajouter un suffixe à la dossier d'entrée après la conversion (ex. _PDF)",
    DISCLAIMER:
      "*Si le dossier n'a pas de suffixe, les fichiers seront convertis dans le dossier racine.",
    INVALID_FOLDER_PATH: 'Chemin de dossier invalide',
    FOLDER_RENAME_ERROR: 'Erreur lors de la renommation du dossier',
    FOLDER_CREATE_ERROR: 'Erreur lors de la création du dossier',
    NO_PDFS_FOUND: 'Aucun PDF trouvé',
    UNEXPECTED_ERROR: 'Erreur inattendue',
    FILE_CREATE_ERROR: (fileName: string) =>
      `Erreur lors de la création du fichier ${fileName}`,
  },
  de: {
    CONVERT_PDFS_TO_MARKDOWN: 'PDFs in Markdown-Ordner konvertieren',
    PDFS_CONVERTED_TO_MARKDOWN: 'PDFs konvertiert in Markdown-Ordner',
    RENAME_INPUT_FOLDER: 'Eingabefolder umbenennen',
    RENAME_INPUT_FOLDER_DESCRIPTION:
      'Eingabefolder nach der Konvertierung umbenennen',
    INPUT_FOLDER_SUFFIX: 'Eingabefolder Suffix',
    INPUT_FOLDER_SUFFIX_DESCRIPTION:
      'Eingabefolder Suffix nach der Konvertierung hinzufügen (ex. _PDF)',
    DISCLAIMER:
      '*Wenn kein Suffix vorhanden ist, werden die Dateien in die Stammordner konvertiert.',
    INVALID_FOLDER_PATH: 'Ungültiger Ordnerpfad',
    FOLDER_RENAME_ERROR: 'Fehler beim Umbenennen der Ordner',
    FOLDER_CREATE_ERROR: 'Fehler beim Erstellen der Ordner',
    NO_PDFS_FOUND: 'Keine PDFs gefunden',
    UNEXPECTED_ERROR: 'Unerwarteter Fehler',
    FILE_CREATE_ERROR: (fileName: string) =>
      `Fehler beim Erstellen der Datei ${fileName}`,
  },
  it: {
    CONVERT_PDFS_TO_MARKDOWN: 'Convertire PDF in cartella Markdown',
    PDFS_CONVERTED_TO_MARKDOWN: 'PDF convertiti in cartella Markdown',
    RENAME_INPUT_FOLDER: 'Rinominare la cartella di input',
    RENAME_INPUT_FOLDER_DESCRIPTION:
      'Rinominare la cartella di input dopo la conversione',
    INPUT_FOLDER_SUFFIX: 'Sufisso della cartella di input',
    INPUT_FOLDER_SUFFIX_DESCRIPTION:
      'Aggiungere un suffisso alla cartella di input dopo la conversione (es. _PDF)',
    DISCLAIMER:
      "*Se non c'è un suffisso, i file verranno convertiti nella cartella radice.",
    INVALID_FOLDER_PATH: 'Percorso cartella non valido',
    FOLDER_RENAME_ERROR: 'Errore durante il rinominamento della cartella',
    FOLDER_CREATE_ERROR: 'Errore durante la creazione della cartella',
    NO_PDFS_FOUND: 'Nessun PDF trovato',
    UNEXPECTED_ERROR: 'Errore imprevisto',
    FILE_CREATE_ERROR: (fileName: string) =>
      `Errore durante la creazione del file ${fileName}`,
  },
  pt: {
    CONVERT_PDFS_TO_MARKDOWN: 'Converter PDFs para pasta de Markdown',
    PDFS_CONVERTED_TO_MARKDOWN: 'PDFs convertidos para pasta de Markdown',
    RENAME_INPUT_FOLDER: 'Renomear pasta de entrada',
    RENAME_INPUT_FOLDER_DESCRIPTION:
      'Renomear a pasta de entrada após a conversão',
    INPUT_FOLDER_SUFFIX: 'Sufixo da pasta de entrada',
    INPUT_FOLDER_SUFFIX_DESCRIPTION:
      'Adicionar um sufixo à pasta de entrada após a conversão (ex. _PDF)',
    DISCLAIMER:
      '*Se não houver um sufixo, os arquivos serão convertidos para a pasta raiz.',
    INVALID_FOLDER_PATH: 'Caminho da pasta inválido',
    FOLDER_RENAME_ERROR: 'Erro ao renomear a pasta',
    FOLDER_CREATE_ERROR: 'Erro ao criar a pasta',
    NO_PDFS_FOUND: 'Nenhum PDF encontrado',
    UNEXPECTED_ERROR: 'Erro inesperado',
    FILE_CREATE_ERROR: (fileName: string) =>
      `Erro ao criar o arquivo ${fileName}`,
  },
};
