import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Speaker from './Speaker';
import Audience from './Audience';
import AppConfig from './AppConfig';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Switch>
          <Route path="/host">
            <Speaker subscriptionKey={AppConfig.COGNITIVE_SVC_API_KEY}
              fromLanguage="fr-FR"
              region={AppConfig.COGNITIVE_SVC_REGION} />
          </Route>
          <Route path="/audience">
            <Audience />
          </Route>
          <Redirect to="/" />
        </Switch>
      </header>
    </div>
  );
}

export default App;
