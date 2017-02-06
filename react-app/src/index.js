import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-intl-redux'
import { createStore, compose } from 'redux'

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
import './index.scss';

const locale = 'en'
const initialState = {
  intl: {
    defaultLocale: locale,
    locale: locale,
    messages: translations[locale]
  }
}

let store = createStore(
    rootReducer,
    initialState,
    compose(
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)

const muiTheme = getMuiTheme({
  userAgent: window.navigator.userAgent
});

injectTapEventPlugin();

const Root = ({ store }) => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App />
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);
