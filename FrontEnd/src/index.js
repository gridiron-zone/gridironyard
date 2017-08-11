import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css';
// component import
import App from './components/App';
import League from './components/League';
import Team from './components/Team';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route path='/:leagueId/team/:teamId' component={Team} />
        <Route path='/:leagueId' component={League} />
        <Route exact path='/' component={League} />
      </Switch>
    </App>
  </BrowserRouter>

  , document.getElementById('root'));
registerServiceWorker();
