import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from './global/App';
import './index.scss';

const muiTheme = getMuiTheme({
  userAgent: window.navigator.userAgent
});

injectTapEventPlugin();

const ThemedApp = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <ThemedApp />,
  document.getElementById('root')
);
