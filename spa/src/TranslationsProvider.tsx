import { Translations } from "microsoft-cognitiveservices-speech-sdk";
import Languages from "./Languages";

export const sendTranslations = (translations: Translations) => {
    const payload: { [index: string]: string } = {};
    Languages.map(l => payload[l] = translations.get(l));
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
    };

    fetch("http://localhost:7071/api/translations", requestOptions)
        .then(((r) => console.log("transmitted translations")), (err) => console.log(`failed to send translations: ${err}`));
}