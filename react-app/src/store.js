import { createStore, compose, applyMiddleware } from 'redux'
import { middleware as actionPromiseReduxMiddleware } from './utils/action-promise-redux/middleware'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import translations from './config/translations.json'
import {addLocaleData} from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
addLocaleData([...en, ...zh])

import rootReducer from './reducer';

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

let store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(actionPromiseReduxMiddleware, logger)
    )
)

export default store