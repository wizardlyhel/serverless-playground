import {combineReducers} from 'redux'
import {intlReducer} from 'react-intl-redux'

import app from './global/reducer'

const rootReducer = combineReducers({
    app,
    intl: intlReducer
})

export default rootReducer