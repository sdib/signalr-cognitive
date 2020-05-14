import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Speaker from './Speaker';
import Audience from './Audience';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Switch>
          <Route path="/host">
            <Speaker subscriptionKey={process.env.REACT_APP_CS_KEY!}
              fromLanguage="fr-FR"
              region={process.env.REACT_APP_CS_REGION!} />
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
