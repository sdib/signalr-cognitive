import { AudioConfig, TranslationRecognizer, SpeechTranslationConfig, TranslationRecognitionEventArgs, Recognizer, TranslationRecognitionResult } from 'microsoft-cognitiveservices-speech-sdk';

export interface TranslatorOptions {
    key: string,
    region: string,
    fromLanguage: string,
    toLanguages: string[]
}

export class Translator {

    private recognizer!: TranslationRecognizer;
    private onRecognizedCallback: (result: TranslationRecognitionResult) => void;
    private audioConfig: AudioConfig;
    private speechConfig: SpeechTranslationConfig;

    constructor(options: TranslatorOptions, recognitionCallback: (result: TranslationRecognitionResult) => void) {
        this.onRecognizedCallback = recognitionCallback
        this.audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        this.speechConfig = SpeechTranslationConfig.fromSubscription(options.key, options.region);

        this.speechConfig.speechRecognitionLanguage = options.fromLanguage;
        options.toLanguages.map(language => this.speechConfig.addTargetLanguage(language));
    }

    recognizerCallback(sender: Recognizer, eventArgs: TranslationRecognitionEventArgs): void {
        this.onRecognizedCallback(eventArgs.result);
    }

    start(): void {
        if (!!this.recognizer) {
            return;
        }

        this.recognizer = new TranslationRecognizer(this.speechConfig, this.audioConfig);
        this.recognizer.recognizing = this.recognizer.recognized = this.recognizerCallback.bind(this);
        this.recognizer.startContinuousRecognitionAsync(() => console.log("started continuous"), err => console.log(err));
    }

    stop(): void {
        this.recognizer.stopContinuousRecognitionAsync();
    }
}