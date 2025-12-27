export type SupportedLanguages = "en" | "es" | "fr" | "de" | "it" | "pt" | "ko";

export const TRANSLATIONS: Record<
	SupportedLanguages,
	{
		CONVERT_PDFS_TO_MARKDOWN: string;
		PDFS_CONVERTED_TO_MARKDOWN: string;
		RENAME_INPUT_FOLDER: string;
		RENAME_INPUT_FOLDER_DESCRIPTION: string;
		INPUT_FOLDER_SUFFIX: string;
		INPUT_FOLDER_SUFFIX_DESCRIPTION: string;
		USE_ATTACHMENT_SETTINGS: string;
		USE_ATTACHMENT_SETTINGS_DESCRIPTION: string;
		DISCLAIMER: string;
		INVALID_FOLDER_PATH: string;
		FOLDER_RENAME_ERROR: string;
		FOLDER_CREATE_ERROR: string;
		NO_PDFS_FOUND: string;
		UNEXPECTED_ERROR: string;
		FILE_CREATE_ERROR: (fileName: string) => string;
		APPLY_TEMPLATE: string;
		APPLY_TEMPLATE_DESCRIPTION: string;
		TEMPLATE_NAME: string;
		TEMPLATE_NAME_DESCRIPTION: string;
		TEMPLATE_APPLY_ERROR: (templateName: string) => string;
		FOLDER_SECTION_HEADING: string;
		ATTACHMENT_SECTION_HEADING: string;
		TEMPLATE_SECTION_HEADING: string;
	}
> = {
	en: {
		CONVERT_PDFS_TO_MARKDOWN: "Convert PDFs to Markdown folder",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs converted to Markdown folder",
		RENAME_INPUT_FOLDER: "Rename input folder",
		RENAME_INPUT_FOLDER_DESCRIPTION:
			"Rename the input folder by adding a suffix after conversion",
		INPUT_FOLDER_SUFFIX: "Input folder suffix",
		INPUT_FOLDER_SUFFIX_DESCRIPTION:
			"Add a suffix to the input folder after conversion (e.g. _PDF)",
		USE_ATTACHMENT_SETTINGS: "Use Obsidian attachment settings",
		USE_ATTACHMENT_SETTINGS_DESCRIPTION:
			'Move PDFs according to Obsidian\'s "Files & Links" attachment settings instead of using the folder suffix logic',
		DISCLAIMER:
			"*If there's no suffix, the files will be converted to the root folder",
		FOLDER_SECTION_HEADING: "Folder handling",
		ATTACHMENT_SECTION_HEADING: "Attachment workflow",
		TEMPLATE_SECTION_HEADING: "Template automation",
		APPLY_TEMPLATE: "Apply template after conversion",
		APPLY_TEMPLATE_DESCRIPTION:
			"Automatically run a template (Templater or core Templates) on each generated note.",
		TEMPLATE_NAME: "Template name or path",
		TEMPLATE_NAME_DESCRIPTION:
			'Provide a template file name or full path. ".md" is optional.',
		INVALID_FOLDER_PATH: "Invalid folder path",
		FOLDER_RENAME_ERROR: "Error renaming folder",
		FOLDER_CREATE_ERROR: "Error creating folder",
		NO_PDFS_FOUND: "No PDFs found",
		UNEXPECTED_ERROR: "Unexpected error",
		FILE_CREATE_ERROR: (fileName: string) =>
			`Error creating file ${fileName}`,
		TEMPLATE_APPLY_ERROR: (templateName: string) =>
			`Failed to apply template "${templateName}". Check the console for details.`,
	},
	es: {
		CONVERT_PDFS_TO_MARKDOWN: "Convertir PDFs a carpeta de Markdown",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs convertidos a carpeta de Markdown",
		RENAME_INPUT_FOLDER: "Renombrar carpeta de entrada",
		RENAME_INPUT_FOLDER_DESCRIPTION:
			"Renombrar la carpeta de entrada después de la conversión",
		INPUT_FOLDER_SUFFIX: "Sufijo de carpeta de entrada",
		INPUT_FOLDER_SUFFIX_DESCRIPTION:
			"Agregar un sufijo a la carpeta de entrada después de la conversión (ej. _PDF)",
		USE_ATTACHMENT_SETTINGS: "Usar configuración de adjuntos de Obsidian",
		USE_ATTACHMENT_SETTINGS_DESCRIPTION:
			'Mover PDFs según la configuración de adjuntos de "Archivos y Enlaces" de Obsidian en lugar de usar la lógica de sufijo de carpeta',
		DISCLAIMER:
			"*Si no hay sufijo, los archivos se convertirán a la carpeta raíz.",
		FOLDER_SECTION_HEADING: "Configuración de carpetas",
		ATTACHMENT_SECTION_HEADING: "Configuración de adjuntos",
		TEMPLATE_SECTION_HEADING: "Automatización de plantillas",
		APPLY_TEMPLATE: "Aplicar plantilla tras la conversión",
		APPLY_TEMPLATE_DESCRIPTION:
			"Ejecuta automáticamente una plantilla (Templater o Plantillas nativas) en cada nota generada.",
		TEMPLATE_NAME: "Nombre o ruta de la plantilla",
		TEMPLATE_NAME_DESCRIPTION:
			'Indica el nombre del archivo de plantilla o la ruta completa. ".md" es opcional.',
		INVALID_FOLDER_PATH: "Ruta de carpeta inválida",
		FOLDER_RENAME_ERROR: "Error al renombrar la carpeta",
		FOLDER_CREATE_ERROR: "Error al crear la carpeta",
		NO_PDFS_FOUND: "No se encontraron PDFs",
		UNEXPECTED_ERROR: "Error inesperado",
		FILE_CREATE_ERROR: (fileName: string) =>
			`Error al crear el archivo ${fileName}`,
		TEMPLATE_APPLY_ERROR: (templateName: string) =>
			`No se pudo aplicar la plantilla "${templateName}". Revisa la consola para ver más detalles.`,
	},
	fr: {
		CONVERT_PDFS_TO_MARKDOWN: "Convertir PDFs en dossier Markdown",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs convertis en dossier Markdown",
		RENAME_INPUT_FOLDER: "Renombrar dossier d'entrée",
		RENAME_INPUT_FOLDER_DESCRIPTION:
			"Renombrar el dossier d'entrée después de la conversión",
		INPUT_FOLDER_SUFFIX: "Sufijo de carpeta de entrada",
		INPUT_FOLDER_SUFFIX_DESCRIPTION:
			"Ajouter un suffixe à la dossier d'entrée après la conversion (ex. _PDF)",
		USE_ATTACHMENT_SETTINGS:
			"Utiliser les paramètres de pièces jointes d'Obsidian",
		USE_ATTACHMENT_SETTINGS_DESCRIPTION:
			"Déplacer les PDFs selon les paramètres de pièces jointes \"Fichiers et Liens\" d'Obsidian au lieu d'utiliser la logique de suffixe de dossier",
		DISCLAIMER:
			"*Si le dossier n'a pas de suffixe, les fichiers seront convertis dans le dossier racine.",
		FOLDER_SECTION_HEADING: "Gestion des dossiers",
		ATTACHMENT_SECTION_HEADING: "Gestion des pièces jointes",
		TEMPLATE_SECTION_HEADING: "Automatisation des modèles",
		APPLY_TEMPLATE: "Appliquer un modèle après la conversion",
		APPLY_TEMPLATE_DESCRIPTION:
			"Lance automatiquement un modèle (Templater ou modèle natif) sur chaque note générée.",
		TEMPLATE_NAME: "Nom ou chemin du modèle",
		TEMPLATE_NAME_DESCRIPTION:
			"Indiquez le nom du fichier modèle ou son chemin complet. « .md » est facultatif.",
		INVALID_FOLDER_PATH: "Chemin de dossier invalide",
		FOLDER_RENAME_ERROR: "Erreur lors de la renommation du dossier",
		FOLDER_CREATE_ERROR: "Erreur lors de la création du dossier",
		NO_PDFS_FOUND: "Aucun PDF trouvé",
		UNEXPECTED_ERROR: "Erreur inattendue",
		FILE_CREATE_ERROR: (fileName: string) =>
			`Erreur lors de la création du fichier ${fileName}`,
		TEMPLATE_APPLY_ERROR: (templateName: string) =>
			`Impossible d'appliquer le modèle « ${templateName} ». Vérifiez la console pour plus de détails.`,
	},
	de: {
		CONVERT_PDFS_TO_MARKDOWN: "PDFs in Markdown-Ordner konvertieren",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs konvertiert in Markdown-Ordner",
		RENAME_INPUT_FOLDER: "Eingabefolder umbenennen",
		RENAME_INPUT_FOLDER_DESCRIPTION:
			"Eingabefolder nach der Konvertierung umbenennen",
		INPUT_FOLDER_SUFFIX: "Eingabefolder Suffix",
		INPUT_FOLDER_SUFFIX_DESCRIPTION:
			"Eingabefolder Suffix nach der Konvertierung hinzufügen (ex. _PDF)",
		USE_ATTACHMENT_SETTINGS: "Obsidian-Anhangeinstellungen verwenden",
		USE_ATTACHMENT_SETTINGS_DESCRIPTION:
			'PDFs gemäß den Anhangeinstellungen von "Dateien und Links" in Obsidian verschieben, anstatt die Suffix-Logik zu verwenden',
		DISCLAIMER:
			"*Wenn kein Suffix vorhanden ist, werden die Dateien in die Stammordner konvertiert.",
		FOLDER_SECTION_HEADING: "Ordnerverwaltung",
		ATTACHMENT_SECTION_HEADING: "Anhangsoptionen",
		TEMPLATE_SECTION_HEADING: "Vorlagenautomatisierung",
		APPLY_TEMPLATE: "Vorlage nach der Konvertierung anwenden",
		APPLY_TEMPLATE_DESCRIPTION:
			"Führt automatisch eine Vorlage (Templater oder Kern-Templates) auf jeder erstellten Notiz aus.",
		TEMPLATE_NAME: "Name oder Pfad der Vorlage",
		TEMPLATE_NAME_DESCRIPTION:
			'Geben Sie den Dateinamen oder den vollständigen Pfad der Vorlage an. ".md" ist optional.',
		INVALID_FOLDER_PATH: "Ungültiger Ordnerpfad",
		FOLDER_RENAME_ERROR: "Fehler beim Umbenennen der Ordner",
		FOLDER_CREATE_ERROR: "Fehler beim Erstellen der Ordner",
		NO_PDFS_FOUND: "Keine PDFs gefunden",
		UNEXPECTED_ERROR: "Unerwarteter Fehler",
		FILE_CREATE_ERROR: (fileName: string) =>
			`Fehler beim Erstellen der Datei ${fileName}`,
		TEMPLATE_APPLY_ERROR: (templateName: string) =>
			`Vorlage "${templateName}" konnte nicht angewendet werden. Details in der Konsole.`,
	},
	it: {
		CONVERT_PDFS_TO_MARKDOWN: "Convertire PDF in cartella Markdown",
		PDFS_CONVERTED_TO_MARKDOWN: "PDF convertiti in cartella Markdown",
		RENAME_INPUT_FOLDER: "Rinominare la cartella di input",
		RENAME_INPUT_FOLDER_DESCRIPTION:
			"Rinominare la cartella di input dopo la conversione",
		INPUT_FOLDER_SUFFIX: "Sufisso della cartella di input",
		INPUT_FOLDER_SUFFIX_DESCRIPTION:
			"Aggiungere un suffisso alla cartella di input dopo la conversione (es. _PDF)",
		USE_ATTACHMENT_SETTINGS: "Usa impostazioni allegati di Obsidian",
		USE_ATTACHMENT_SETTINGS_DESCRIPTION:
			'Sposta i PDF secondo le impostazioni degli allegati "File e Collegamenti" di Obsidian invece di usare la logica del suffisso cartella',
		DISCLAIMER:
			"*Se non c'è un suffisso, i file verranno convertiti nella cartella radice.",
		FOLDER_SECTION_HEADING: "Gestione cartelle",
		ATTACHMENT_SECTION_HEADING: "Impostazioni allegati",
		TEMPLATE_SECTION_HEADING: "Automazione dei template",
		APPLY_TEMPLATE: "Applica un template dopo la conversione",
		APPLY_TEMPLATE_DESCRIPTION:
			"Esegue automaticamente un template (Templater o Template nativi) su ogni nota generata.",
		TEMPLATE_NAME: "Nome o percorso del template",
		TEMPLATE_NAME_DESCRIPTION:
			'Indica il nome del file template o il percorso completo. ".md" è facoltativo.',
		INVALID_FOLDER_PATH: "Percorso cartella non valido",
		FOLDER_RENAME_ERROR: "Errore durante il rinominamento della cartella",
		FOLDER_CREATE_ERROR: "Errore durante la creazione della cartella",
		NO_PDFS_FOUND: "Nessun PDF trovato",
		UNEXPECTED_ERROR: "Errore imprevisto",
		FILE_CREATE_ERROR: (fileName: string) =>
			`Errore durante la creazione del file ${fileName}`,
		TEMPLATE_APPLY_ERROR: (templateName: string) =>
			`Impossibile applicare il template "${templateName}". Controlla la console per i dettagli.`,
	},
	pt: {
		CONVERT_PDFS_TO_MARKDOWN: "Converter PDFs para pasta de Markdown",
		PDFS_CONVERTED_TO_MARKDOWN: "PDFs convertidos para pasta de Markdown",
		RENAME_INPUT_FOLDER: "Renomear pasta de entrada",
		RENAME_INPUT_FOLDER_DESCRIPTION:
			"Renomear a pasta de entrada após a conversão",
		INPUT_FOLDER_SUFFIX: "Sufixo da pasta de entrada",
		INPUT_FOLDER_SUFFIX_DESCRIPTION:
			"Adicionar um sufixo à pasta de entrada após a conversão (ex. _PDF)",
		USE_ATTACHMENT_SETTINGS: "Usar configurações de anexos do Obsidian",
		USE_ATTACHMENT_SETTINGS_DESCRIPTION:
			'Mover PDFs de acordo com as configurações de anexos de "Arquivos e Links" do Obsidian em vez de usar a lógica de sufixo de pasta',
		DISCLAIMER:
			"*Se não houver um sufixo, os arquivos serão convertidos para a pasta raiz.",
		FOLDER_SECTION_HEADING: "Configuração de pastas",
		ATTACHMENT_SECTION_HEADING: "Configuração de anexos",
		TEMPLATE_SECTION_HEADING: "Automação de modelos",
		APPLY_TEMPLATE: "Aplicar modelo após a conversão",
		APPLY_TEMPLATE_DESCRIPTION:
			"Executa automaticamente um modelo (Templater ou Templates nativos) em cada nota gerada.",
		TEMPLATE_NAME: "Nome ou caminho do modelo",
		TEMPLATE_NAME_DESCRIPTION:
			'Informe o nome do arquivo de modelo ou o caminho completo. ".md" é opcional.',
		INVALID_FOLDER_PATH: "Caminho da pasta inválido",
		FOLDER_RENAME_ERROR: "Erro ao renomear a pasta",
		FOLDER_CREATE_ERROR: "Erro ao criar a pasta",
		NO_PDFS_FOUND: "Nenhum PDF encontrado",
		UNEXPECTED_ERROR: "Erro inesperado",
		FILE_CREATE_ERROR: (fileName: string) =>
			`Erro ao criar o arquivo ${fileName}`,
		TEMPLATE_APPLY_ERROR: (templateName: string) =>
			`Não foi possível aplicar o modelo "${templateName}". Verifique o console para mais detalhes.`,
	},
	ko: {
		CONVERT_PDFS_TO_MARKDOWN: "PDF를 Markdown 폴더로 변환",
		PDFS_CONVERTED_TO_MARKDOWN: "PDF가 Markdown 폴더로 변환되었습니다",
		RENAME_INPUT_FOLDER: "입력 폴더 이름 변경",
		RENAME_INPUT_FOLDER_DESCRIPTION:
			"변환 후 접미사를 추가하여 입력 폴더 이름 변경",
		INPUT_FOLDER_SUFFIX: "입력 폴더 접미사",
		INPUT_FOLDER_SUFFIX_DESCRIPTION:
			"변환 후 입력 폴더에 접미사 추가 (예: _PDF)",
		USE_ATTACHMENT_SETTINGS: "Obsidian 첨부 파일 설정 사용",
		USE_ATTACHMENT_SETTINGS_DESCRIPTION:
			'폴더 접미사 로직 대신 Obsidian의 "파일 및 링크" 첨부 파일 설정에 따라 PDF 이동',
		DISCLAIMER: "*접미사가 없으면 파일이 루트 폴더로 변환됩니다",
		FOLDER_SECTION_HEADING: "폴더 처리",
		ATTACHMENT_SECTION_HEADING: "첨부 파일 워크플로우",
		TEMPLATE_SECTION_HEADING: "템플릿 자동화",
		APPLY_TEMPLATE: "변환 후 템플릿 적용",
		APPLY_TEMPLATE_DESCRIPTION:
			"생성된 각 노트에 템플릿(Templater 또는 기본 템플릿)을 자동으로 실행합니다.",
		TEMPLATE_NAME: "템플릿 이름 또는 경로",
		TEMPLATE_NAME_DESCRIPTION:
			'템플릿 파일 이름 또는 전체 경로를 제공하세요. ".md"는 선택 사항입니다.',
		INVALID_FOLDER_PATH: "잘못된 폴더 경로",
		FOLDER_RENAME_ERROR: "폴더 이름 변경 오류",
		FOLDER_CREATE_ERROR: "폴더 생성 오류",
		NO_PDFS_FOUND: "PDF를 찾을 수 없습니다",
		UNEXPECTED_ERROR: "예기치 않은 오류",
		FILE_CREATE_ERROR: (fileName: string) => `파일 ${fileName} 생성 오류`,
		TEMPLATE_APPLY_ERROR: (templateName: string) =>
			`템플릿 "${templateName}" 적용에 실패했습니다. 자세한 내용은 콘솔을 확인하세요.`,
	},
};
