import { createReducers } from '../utils/redux';
import { handleError } from '../utils/errors';
import * as Immutable from 'immutable'

import * as appActions from './actions/'

const initialState = Immutable.fromJS({
    drawerIsOpen: false,
    authenticated: false,
    formErrors: {},
    username: false
})

const setUserAuthenticationStatus = (state, status) => {
    return state.setIn(['authenticated'], status)
}

const handleFormState = (formName) => {
    return {
        start: (state) => {
            return handleError(state, formName, undefined)
        },
        failure: (state, { payload }) => {
            return handleError(state, formName, payload)
        },
        success: (state, { payload }) => {
            return state.setIn(['username'], payload)
        }
    }
}

// Reducers
export default createReducers({
    [appActions.setDrawerState]: (state, payload) => {
        return state.setIn(['drawerIsOpen'], payload)
    },
    [appActions.openDrawer]: (state) => {
        return state.setIn(['drawerIsOpen'], true)
    },
    [appActions.closeDrawer]: (state) => {
        return state.setIn(['drawerIsOpen'], false)
    },
    [appActions.restoreUserSession]: {
        failure: (state, { payload }) => {
            return setUserAuthenticationStatus(state, false)
        },
        success: (state, { payload }) => {
            state = state.setIn(['username'], payload)
            return setUserAuthenticationStatus(state, true)
        }
    },
    [appActions.signUp]: handleFormState('register'),
    [appActions.signUpConfirm]: handleFormState('userConfirmation'),
    [appActions.signIn]: {
        start: (state) => {
            return handleError(state, 'login', undefined)
        },
        failure: (state, { payload }) => {
            state = setUserAuthenticationStatus(state, false)
            return handleError(state, 'login', payload)
        },
        success: (state, { payload }) => {
            state = state.setIn(['username'], payload)
            return setUserAuthenticationStatus(state, true)
        }
    },
    [appActions.signOut]: (state) => {
        return setUserAuthenticationStatus(state, false)
    }
}, initialState)
