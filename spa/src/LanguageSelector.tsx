import React from 'react';

export const Languages = ["it", "nl", "fr", "en"];
export const DefaultLanguage = Languages[0];

export interface LanguageSelectorProps {
    value: string;
    onLanguageUpdated: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const LanguageSelector = (props: LanguageSelectorProps) => (
    <select value={props.value} onChange={props.onLanguageUpdated}>
        {Languages.map(language => <option key={language} value={language}>{language}</option>)}
    </select>
);