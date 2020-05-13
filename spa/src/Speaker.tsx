import React from 'react';
import "./Speaker.css";
import { Translator, TranslatorOptions } from './Translator';
import { TranslationRecognitionResult } from 'microsoft-cognitiveservices-speech-sdk';

interface SpeakerState {
    text: string
}

interface SpeakerProps {
    fromLanguage: string
    subscriptionKey: string
    region: string
    toLanguages: Array<string>
}

export default class SpeechToText extends React.Component<SpeakerProps, SpeakerState> {

    translator!: Translator;
    state: SpeakerState;

    constructor(props: any) {
        super(props);
        this.state = { text: "" };
    }

    render() {
        return <p className="Speaker-translation">{this.state.text}</p>
    }

    componentWillUnmount() {
        this.translator.stop();
    }

    componentDidMount() {
        const options: TranslatorOptions = { ...this.props, key: this.props.subscriptionKey };
        this.translator = new Translator(options, this.onSpeechRecognized.bind(this));
        this.translator.start();
    }

    onSpeechRecognized(result: TranslationRecognitionResult): void {
        this.setState({ text: result.text });
    }
}