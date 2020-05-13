import React from 'react';
import logo from './logo.svg';
import './App.css';
import SpeechToText from './Speaker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SpeechToText subscriptionKey="cc33c78f88ba4bdf938db73824434143" fromLanguage="fr-FR" toLanguages={["it-IT"]} region="westeurope" />
      </header>
    </div>
  );
}

export default App;
