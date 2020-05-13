import React from 'react';
import TextDisplay from './TextDisplay';
import * as signalR from '@microsoft/signalr'
import Languages from './Languages';

interface AudienceState {
    text: string
    selectedLanguage: string
}

export default class Audience extends React.Component<{}, AudienceState> {

    connection: signalR.HubConnection;

    constructor(props: {}) {
        super(props);
        this.handleNewTranslation.bind(this)
        this.updateHubSubscription.bind(this)

        this.state = { selectedLanguage: Languages[0], text: "" }
    }

    render = () => (
        <div>
            <select value={this.state.selectedLanguage} onChange={this.onLanguageUpdated}>
                {Languages.map(language => <option key={language} value={language}>{language}</option>)}
            </select>
            <TextDisplay text={this.state.text} />
        </div>
    );

    componentDidMount = () => {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_API!)
            .build();

        this.connection.start();
        this.updateHubSubscription(this.state.selectedLanguage);
    }

    onLanguageUpdated = (e: React.FormEvent<HTMLSelectElement>) => {
        const newLanguage = e.currentTarget.value;
        this.updateHubSubscription(newLanguage, this.state.selectedLanguage)
        this.setState({
            selectedLanguage: newLanguage
        });
    }

    updateHubSubscription = (currentSubName: string, previousSubName?: string) => {
        if (previousSubName !== undefined) {
            this.connection.off(previousSubName, this.handleNewTranslation)
        }
        this.connection.on(currentSubName, this.handleNewTranslation);
    }

    handleNewTranslation = (translation: string) => {
        this.setState({
            ...this.state,
            text: translation
        });
    }
}
