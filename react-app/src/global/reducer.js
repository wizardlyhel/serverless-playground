import { createReducers } from '../utils/redux';
import { handleAWSCognitoError } from '../utils/aws-errors';
import { cognitoUserStatePath } from '../utils/state-paths';
import * as Immutable from 'immutable'

import * as appActions from './actions/'

const initialState = Immutable.fromJS({
    authenticated: false,
    aws: {
        cognitoUser: false
    },
    formErrors: {
        register: false,
        userConfirmation: false
    }
})

const handleAccountState = (formName) => {
    return {
        start: (state, { payload }) => {
            return handleAWSCognitoError(state, formName, undefined)
        },
        failure: (state, { payload }) => {
            return handleAWSCognitoError(state, formName, payload)
        },
        success: (state, { payload }) => {
            return state.mergeDeep(cognitoUserStatePath, payload)
        }
    }
}

// Reducers
export default createReducers({
    [appActions.signUp]: {
        start: (state, { payload }) => {
            return handleAWSCognitoError(state, 'register', undefined)
        },
        failure: (state, { payload }) => {
            return handleAWSCognitoError(state, 'register', payload)
        },
        success: (state, { payload }) => {
            return state.setIn(cognitoUserStatePath, payload)
        }
    },
    [appActions.signUpConfirm]: {
        start: (state, { payload }) => {
            return handleAWSCognitoError(state, 'userConfirmation', undefined)
        },
        failure: (state, { payload }) => {
            return handleAWSCognitoError(state, 'userConfirmation', payload)
        },
        success: (state, { payload }) => {
            return state.setIn(cognitoUserStatePath, payload)
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
    [appActions.signOut]: (state) => {
        const cognitoUser = state.getIn(cognitoUserStatePath)
        if (cognitoUser) {
            return state.setIn(cognitoUserStatePath, cognitoUser.signOut())
        }
        return state
    },
    [appActions.userAuthenticationProxy]: (state) => {return state} 
}, initialState)