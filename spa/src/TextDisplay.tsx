import React from 'react';
import './TextDisplay.css';

export interface TextDisplayProps {
    text: string
}

export default (props: TextDisplayProps) => <p className="TextDisplay-text" >{props.text}</p>