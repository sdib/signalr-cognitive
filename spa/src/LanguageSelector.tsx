import React from 'react';
import Languages, { Language } from './Languages';

export const DefaultLanguage = Languages[0];

export interface LanguageSelectorProps {
    value: string;
    valuePropName: keyof Language;
    label: string;
    onLanguageUpdated: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const LanguageSelector = (props: LanguageSelectorProps) => (
    <div>
        <label>{props.label} : </label>
        <select value={props.value} onChange={props.onLanguageUpdated}>
            {Languages.map(language => <option key={language.locale} value={language[props.valuePropName]}>{language.label}</option>)}
        </select>
    </div>
);