import React, { useState, useEffect, useRef } from 'react';
import { Translator } from './Translator';
import { TranslationRecognitionResult } from 'microsoft-cognitiveservices-speech-sdk';
import { sendTranslations } from './TranslationsProvider';
import TextDisplay from './TextDisplay';
import Languages from './Languages';

interface SpeakerProps {
    fromLanguage: string
    subscriptionKey: string
    region: string
}

const Speaker = (props: SpeakerProps) => {

    const [text, setText] = useState('');

    const handleNewTranslation = useRef((translationRecognitionResult: TranslationRecognitionResult) => {
        setText(translationRecognitionResult.text)
        sendTranslations(translationRecognitionResult.translations)
    })

    useEffect(() => {
        const translatorOptions = {
            ...props,
            key: props.subscriptionKey,
            toLanguages: Languages.map(l => l.languageCode)
        };
        const translator = new Translator(translatorOptions, handleNewTranslation.current)
        translator.start();
        return () => {
            translator.stop();
        }
    }, [props])

    return (
        <TextDisplay text={text} />
    )
}

export default Speaker;