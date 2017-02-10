import { mergeDeep, createReducers } from './utils';
import { Map, List } from 'immutable'

import * as appActions from './actions'

const initialState = Map({
    loggedIn: false
})

// Reducers
export default createReducers({
    [appActions.login]: {
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