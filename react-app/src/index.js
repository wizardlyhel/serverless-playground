import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-intl-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import { middleware as actionPromiseReduxMiddleware } from './utils/action-promise-redux/middleware'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import translations from './config/translations.json'
import {addLocaleData} from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
addLocaleData([...en, ...zh])

import App from './global/App';
import rootReducer from './reducer';
import AppTheme from './global/style/theme'

// Internationalization
const locale = 'en'
const initialState = {
    intl: {
        defaultLocale: locale,
        locale: locale,
        messages: translations[locale]
    }
}

// Dev tools
const logger = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store
let store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(thunk, actionPromiseReduxMiddleware, logger)
    )
)

// Theme
const muiTheme = getMuiTheme(AppTheme);

injectTapEventPlugin();

const Root = () => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App />
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
