import {combineReducers} from 'redux'
import {intlReducer} from 'react-intl-redux'

import appReducer from './global/reducer'

const rootReducer = combineReducers({
    appReducer,
    intl: intlReducer
})

export default rootReducer