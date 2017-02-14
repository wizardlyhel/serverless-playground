import { createReducers } from '../utils/redux';
import { Map } from 'immutable'

import * as appActions from './actions/'

const initialState = Map({
    authenticated: false,
    aws: {}
})

const awsCognitoErrorCodeMapping = (err) => {
    switch(err.code) {
        case 'UsernameExistsException':
            return 'awsError.userExists'
        default:
            return 'awsError.server'
    }
}

const handleAWSError = (state, formName, payload) => {
    return state.setIn(['formErrors', formName], payload ? awsCognitoErrorCodeMapping(payload) : payload)
}

// Reducers
export default createReducers({
    [appActions.signUp]: {
        start: (state, { payload }) => {
            return handleAWSError(state, 'register', undefined)
        },
        failure: (state, { payload }) => {
            return handleAWSError(state, 'register', payload)
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