import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-intl-redux'

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from './global/App';
import AppTheme from './global/style/theme'
import store from './store'

// Theme
const muiTheme = getMuiTheme(AppTheme);

injectTapEventPlugin();

const Root = () => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App store={store} />
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
