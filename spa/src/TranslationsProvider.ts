import { Translations } from "microsoft-cognitiveservices-speech-sdk";
import AppConfig from "./AppConfig";
import Languages from "./Languages";

export const sendTranslations = (translations: Translations) => {
    const payload: { [index: string]: string } = {};
    Languages.map(l => payload[l.languageCode] = translations.get(l.languageCode));
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
    };

    fetch(AppConfig.TRANSLATIONS_API, requestOptions)
        .then(undefined, (err) => console.log(`failed to send translations: ${err}`));
}