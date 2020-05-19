import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Speaker from './Speaker';
import Audience from './Audience';
import AppConfig from './AppConfig';
import { LanguageSelector, DefaultLanguage } from './LanguageSelector';

const App = () => {

  const [speakerLanguage, setSpeakerLanguage] = useState(DefaultLanguage.locale);

  const handleNewSpeakerLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpeakerLanguage(e.currentTarget.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
          <Switch>
            <Route path="/host">
              <LanguageSelector label="Speaker language" valuePropName="locale" value={speakerLanguage} onLanguageUpdated={handleNewSpeakerLanguage} />
              <Speaker subscriptionKey={AppConfig.COGNITIVE_SVC_API_KEY}
                fromLanguage={speakerLanguage}
                region={AppConfig.COGNITIVE_SVC_REGION} />
            </Route>
            <Route path="/audience">
              <Audience />
            </Route>
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
