import { createReducers } from '../utils/redux';
import { Map } from 'immutable'

import * as appActions from './actions/'

const initialState = Map({
    authenticated: false,
    aws: {}
})

// Reducers
export default createReducers({
    [appActions.signUp]: {
        failure: (state, { payload }) => {
            console.log('Reducer failure', payload);
            return state
        },
        success: (state, { payload }) => {
            return state.setIn(['aws'], payload)
        }
    },
    [appActions.signIn]: {
        failure: (state, { payload }) => {
            console.log('Reducer failure', payload);
            return state
        },
        success: (state, { payload }) => {
            console.log('Reducer success', payload);
            return state
        }
    },
    [appActions.signOut]: {
        failure: (state, { payload }) => {
            console.log('Reducer failure', payload);
            return state
        },
        success: (state, { payload }) => {
            console.log('Reducer success', payload);
            return state
        }
    }
}, initialState)