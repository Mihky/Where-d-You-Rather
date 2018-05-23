import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CardDuel from './components/duel.js';
import Winner from './components/winner.js';

ReactDOM.render(
  (<BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/winner" component={Winner}/>
    </Switch>
  </BrowserRouter>),
  document.getElementById('root')
);
registerServiceWorker();
