import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css';
// component import
import App from './components/App';
import League from './components/League';
import Team from './components/Team';
import Players from './containers/Players';
// import for store creation
import reducer from './reducers/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path='/:leagueId/team/:teamId' component={Team} />
          <Route exact path='/:leagueId/players' component={Players} />
          <Route exact path='/:leagueId' component={League} />
          <Route exact path='/' component={League} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
