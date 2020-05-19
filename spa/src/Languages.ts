export interface Language {
    languageCode: string,
    label: string,
    locale: string;
}

const sortLanguageUsingAlphabeticLabel = (a: Language, b: Language) => {
    if (a.label > b.label) {
        return 1;
    }
    if (a.label < b.label) {
        return -1;
    }

    return 0;
}

const Languages: Array<Language> = [
    {
        languageCode: "es",
        label: "Spanish",
        locale: "es-ES"
    },
    {
        languageCode: "it",
        label: "Italian",
        locale: "it-IT"
    },
    {
        languageCode: "nl",
        label: "Netherlands",
        locale: "nl-NL"
    },
    {
        languageCode: "fr",
        label: "French",
        locale: "fr-FR"
    },
    {
        languageCode: "en",
        label: "English",
        locale: "en-US"
    },
    {
        languageCode: "zh-Hant",
        label: "Chineese",
        locale: "zh-CN"
    },
    {
        languageCode: "ja",
        label: "Japaneese",
        locale: "ja-JA"
    },
    {
        languageCode: "ar",
        label: "Arabic",
        locale: "ar-SY"
    }
].sort(sortLanguageUsingAlphabeticLabel);

export default Languages;