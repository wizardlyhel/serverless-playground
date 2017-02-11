import { mergeDeep, createReducers } from './utils';
import { Map, List } from 'immutable'

import * as appActions from './actions'

const initialState = Map({
    loggedIn: false
})

// Reducers
export default createReducers({
    [appActions.loginV2]: appActions.login,
    [appActions.loginV3]: appActions.login,
    [appActions.login]: {
        failure: (state, payload) => {
            console.log('Reducer failure', payload);
            return state
        },
        success: (state, payload) => {
            console.log('Reducer success', payload);
            return state
        }
    },
    [appActions.loginForm]: {
        failure: (state, payload) => {
            console.log('Reducer failure', payload);
            return state
        },
        success: (state, payload) => {
            console.log('Reducer success', payload);
            return state
        }
    }
}, initialState)