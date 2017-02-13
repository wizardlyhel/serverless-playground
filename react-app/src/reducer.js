import {combineReducers} from 'redux'
import {intlReducer} from 'react-intl-redux'
import { reducer as formReducer } from 'redux-form'

import app from './global/reducer'

const rootReducer = combineReducers({
    app,
    intl: intlReducer,
    form: formReducer
})

export default rootReducer