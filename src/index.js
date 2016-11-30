import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './js/App';
import Equilibrium from './js/Equilibrium';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={() => <div>Hello</div>} />
        <Route path="equilibrium" component={Equilibrium} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
