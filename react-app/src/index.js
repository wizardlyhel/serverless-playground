import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-intl-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import { middleware as reduxPackMiddleware } from 'redux-pack'
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

const locale = 'en'
const initialState = {
  intl: {
    defaultLocale: locale,
    locale: locale,
    messages: translations[locale]
  }
}
const logger = createLogger()

let store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxPackMiddleware, logger),
    compose(
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)

const muiTheme = getMuiTheme({
  userAgent: window.navigator.userAgent
});

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
