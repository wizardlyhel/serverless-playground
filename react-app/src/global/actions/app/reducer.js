import { createReducersMap, createDefaultReducers } from '../../../utils/action-promise-redux/reducerMap'
import { handleError, createErrorPayload } from '../../../utils/errors';
import * as Immutable from 'immutable'

import * as appActions from './'

const drawerIsOpen = 'drawerIsOpen'
const showTerms = 'showTerms'
const authenticated = 'authenticated'
const isGuest = 'isGuest'
const formErrors = 'formErrors'
const username = 'username'

const initialState = Immutable.fromJS({
    [authenticated]: false,
    [isGuest]: false,
    [drawerIsOpen]: false,
    [showTerms]: true,
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
            appActions.signOut.success,
            appActions.showTerms
        ],
        handler: {
            reducer: showTerms,
            payloadTransform: (type, payload) => {
                if (type === appActions.signOut.success) {
                    return false
                }
                return payload
            }
        }
    },
    {
        actionsMap: [
            appActions.guestSignUp.success
        ],
        handler: {
            reducer: isGuest,
            payloadTransform: () => (true)
        }
    },
        {
        actionsMap: [
            appActions.signOut.success
        ],
        handler: {
            reducer: isGuest,
            payloadTransform: () => (false)
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
            appActions.signIn.success,
            appActions.guestSignIn.success
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
            appActions.signIn.success,
            appActions.guestSignIn.success,
            appActions.guestSignIn.failed
        ],
        handler: {
            reducer: username,
            payloadTransform: (type, payload) => {
                switch(type) {
                    case appActions.guestSignIn.failed:
                        return payload.username
                    default:
                        return payload
                }
            }
        }
    },
    {
        actionsMap: [
            appActions.signOut.success
        ],
        handler: {
            reducer: username,
            payloadTransform: () => (false)
        }
    },
    {
        actionsMap: [
            appActions.signUp.start,
            appActions.signUp.failed,
            appActions.signUpConfirm.start,
            appActions.signUpConfirm.failed,
            appActions.signIn.start,
            appActions.signIn.failed,
            appActions.signIn.start,
            appActions.guestSignIn.failed,
            appActions.restoreUserSession.success
        ],
        handler: {
            reducer: formErrors,
            payloadTransform: (type, payload) => {
                switch(type) {
                    case appActions.signUp.failed:
                    	return createErrorPayload('register', payload)
                    case appActions.signUpConfirm.failed:
                    	return createErrorPayload('userConfirmation', payload)
                    case appActions.signIn.failed:
                    	return createErrorPayload('login', payload)
                    case appActions.guestSignIn.failed:
                        return createErrorPayload('login', payload)
                    default:
                        return {}
                }
            }
        }
    }
],{
    ...createDefaultReducers(authenticated, showTerms, drawerIsOpen, username, isGuest),
    formErrors: (state, payload) => {
        return handleError(state, payload)
    }
}, initialState)
