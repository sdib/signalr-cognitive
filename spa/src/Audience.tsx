import React, { useState, useEffect, useRef } from 'react';
import TextDisplay from './TextDisplay';
import * as signalR from '@microsoft/signalr'
import { LanguageSelector, DefaultLanguage } from './LanguageSelector';
import AppConfig from './AppConfig';

const Audience = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(DefaultLanguage.languageCode);
    const [translation, setTranslation] = useState('');

    const connection = useRef(new signalR.HubConnectionBuilder()
        .withUrl(AppConfig.API)
        .build())

    const handleNewTranslation = useRef((newTranslation: string) => {
        setTranslation(newTranslation)
    })

    useEffect(() => {
        connection.current.start();
        const cleanupConnection = connection.current;
        return () => {
            cleanupConnection.stop();
        }
    }, [connection])

    useEffect(() => {
        connection.current.on(selectedLanguage, handleNewTranslation.current)
    }, [selectedLanguage])

    const onLanguageUpdated = (e: React.FormEvent<HTMLSelectElement>) => {
        connection.current.off(selectedLanguage, handleNewTranslation.current)
        setSelectedLanguage(e.currentTarget.value)
    }

    return (
        <div>
            <LanguageSelector label="Attendee language" valuePropName="languageCode" onLanguageUpdated={onLanguageUpdated} value={selectedLanguage} />
            <TextDisplay text={translation} />
        </div>
    )
}

export default Audience;