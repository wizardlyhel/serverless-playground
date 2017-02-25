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
        reducersMap: [drawerIsOpen]
    },
    {
        actionsMap: [
            appActions.restoreUserSession.failed,
            appActions.signIn.failed,
            appActions.signOut.success
        ],
        reducersMap: ['authenticationFailed']
    },
    {
        actionsMap: [
            appActions.restoreUserSession.success,
            appActions.signIn.success
        ],
        reducersMap: [authenticated]
    },
    {
        actionsMap: [
            appActions.restoreUserSession.success,
            appActions.signUp.success,
            appActions.signUpConfirm.success,
            appActions.signIn.success
        ],
        reducersMap: [username]
    },
    {
        actionsMap: [
            appActions.signUp.failed,
            appActions.signUpConfirm.failed,
            appActions.signIn.failed
        ],
        reducersMap: [formErrors]
    },
    {
        actionsMap: [
            appActions.restoreUserSession.success,
            appActions.signUp.start,
            appActions.signUpConfirm.start,
            appActions.signIn.start
        ],
        reducersMap: ['clearFormErrors']
    }
],{
    authenticated: (state) => {
        return state.setIn([authenticated], true)
    },
    authenticationFailed: (state) => {
        return state.setIn([authenticated], false)
    },
    drawerIsOpen: (state, payload) => {
        return state.setIn([drawerIsOpen], payload)
    },
    clearFormErrors: (state) => {
        return state.setIn([formErrors], {})
    },
    formErrors: (state, { payload }) => {
        return handleError(state, payload)
    },
    username: (state, { payload }) => {
        return state.setIn([username], payload)
    }
}, initialState)

// const setUserAuthenticationStatus = (state, status) => {
//     return state.setIn(['authenticated'], status)
// }

// const handleFormState = (formName) => {
//     return {
//         start: (state) => {
//             return handleError(state, formName, undefined)
//         },
//         failure: (state, { payload }) => {
//             return handleError(state, formName, payload)
//         },
//         success: (state, { payload }) => {
//             return state.setIn(['username'], payload)
//         }
//     }
// }

// // Reducers
// export default createReducers({
//     [appActions.setDrawerState]: (state, payload) => {
//         return state.setIn(['drawerIsOpen'], payload)
//     },
//     [appActions.restoreUserSession]: {
//         failure: (state, { payload }) => {
//             return setUserAuthenticationStatus(state, false)
//         },
//         success: (state, { payload }) => {
//             state = state.setIn(['username'], payload)
//             return setUserAuthenticationStatus(state, true)
//         }
//     },
//     [appActions.signUp]: handleFormState('register'),
//     [appActions.signUpConfirm]: handleFormState('userConfirmation'),
//     [appActions.signIn]: {
//         start: (state) => {
//             return handleError(state, 'login', undefined)
//         },
//         failure: (state, { payload }) => {
//             state = setUserAuthenticationStatus(state, false)
//             return handleError(state, 'login', payload)
//         },
//         success: (state, { payload }) => {
//             state = state.setIn(['username'], payload)
//             return setUserAuthenticationStatus(state, true)
//         }
//     },
//     [appActions.signOut]: (state) => {
//         return setUserAuthenticationStatus(state, false)
//     }
// }, initialState)
