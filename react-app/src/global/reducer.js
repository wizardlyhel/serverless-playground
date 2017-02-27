// import { createReducers } from '../utils/redux';
import { createReducersMap } from '../utils/action-promise-redux/reducerMap'
import { handleError } from '../utils/errors';
import * as Immutable from 'immutable'

import * as appActions from './actions/'

const drawerIsOpen = 'drawerIsOpen'
const authenticated = 'authenticated'
const formErrors = 'formErrors'
const username = 'username'

const initialState = Immutable.fromJS({
    [authenticated]: false,
    [drawerIsOpen]: false,
    [formErrors]: {},
    [username]: false
})

export default createReducersMap([
    {
        actionsMap: [appActions.setDrawerState],
        handler: {
            reducer: drawerIsOpen
        }
    },
    {
        actionsMap: [
            appActions.restoreUserSession.failed,
            appActions.signIn.failed,
            appActions.signOut.success
        ],
        handler: {
            reducer: authenticated,
            payloadTransform: () => (false)
        }
    },
    {
        actionsMap: [
            appActions.restoreUserSession.success,
            appActions.signIn.success
        ],
        handler: {
            reducer: authenticated,
            payloadTransform: () => (true)
        }
    },
    {
        actionsMap: [
            appActions.restoreUserSession.success,
            appActions.signUp.success,
            appActions.signUpConfirm.success,
            appActions.signIn.success
        ],
        handler: {
            reducer: username
        }
    },
    {
        actionsMap: [
            appActions.signUp.failed,
            appActions.signUpConfirm.failed,
            appActions.signIn.failed
        ],
        handler: {
            reducer: formErrors,
            payloadTransform: (type, payload) => {
                switch(type) {
                    case appActions.signUp.failed:
                        return {
                            err: payload, 
                            formName: 'register'
                        }
                    case appActions.signUpConfirm.failed:
                        return {
                            err: payload, 
                            formName: 'userConfirmation'
                        }
                    case appActions.signIn.failed:
                        return {
                            err: payload, 
                            formName: 'login'
                        }
                    default:
                        return {
                            err: payload, 
                            formName: 'app'
                        }
                }
            }
        }
    },
    {
        actionsMap: [
            appActions.restoreUserSession.success,
            appActions.signUp.start,
            appActions.signUpConfirm.start,
            appActions.signIn.start
        ],
        handler: {
            reducer: formErrors,
            payloadTransform: () => ({})
        }
    }
],{
    authenticated: (state, payload) => {
        return state.setIn([authenticated], payload)
    },
    drawerIsOpen: (state, payload) => {
        return state.setIn([drawerIsOpen], payload)
    },
    formErrors: (state, payload) => {
        return handleError(state, payload)
    },
    username: (state, payload) => {
        return state.setIn([username], payload)
    }
}, initialState)
