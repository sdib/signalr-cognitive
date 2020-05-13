import React from 'react';
import { Translator, TranslatorOptions } from './Translator';
import { TranslationRecognitionResult } from 'microsoft-cognitiveservices-speech-sdk';
import { sendTranslations } from './TranslationsProvider';
import TextDisplay from './TextDisplay';

interface SpeakerState {
    text: string
}

interface SpeakerProps {
    fromLanguage: string
    subscriptionKey: string
    region: string
    toLanguages: Array<string>
}

export default class Speaker extends React.Component<SpeakerProps, SpeakerState> {

    translator!: Translator;
    state: SpeakerState;

    constructor(props: any) {
        super(props);
        this.state = { text: "" };
    }

    render = () => <TextDisplay text={this.state.text} />

    componentWillUnmount = () => this.translator.stop();

    componentDidMount = () => {
        const options: TranslatorOptions = { ...this.props, key: this.props.subscriptionKey };
        this.translator = new Translator(options, this.onSpeechRecognized.bind(this));
        this.translator.start();
    }

    onSpeechRecognized = (result: TranslationRecognitionResult): void => {
        this.setState({ text: result.text });
        sendTranslations(result.translations);
    }
}