import {combineReducers} from 'redux'
import {intlReducer} from 'react-intl-redux'
import { reducer as formReducer } from 'redux-form'

import app from './global/actions/app/reducer'
import resource from './global/actions/resource/reducer'

const rootReducer = combineReducers({
    app,
    resource,
    intl: intlReducer,
    form: formReducer
})

export default rootReducer