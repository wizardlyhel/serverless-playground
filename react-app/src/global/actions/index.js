import { createAction } from '../../utils/action-promise-redux/createAction';
import { browserHistory } from 'react-router'
import {
    getUserSession,
    userSignUp,
    confirmUser,
    resendConfirmationCode,
    userSignIn,
    userSignOut
} from './authentication'

// Actions

// Proxy function to access state
//
// Must be in the format of:
// {
//      action: <action to be dispatch>,
//      args: value to be forward
// }
export const actionProxy = (payload) => {
    return (dispatch, getState) => {
        dispatch(payload.action(dispatch, getState, payload.args))
    }
}

export const setDrawerState = createAction('Set drawer state')
export const restoreUserSession = createAction('Restore user session', getUserSession)

export const signUp = createAction('Sign up', userSignUp, {
    onSuccess: () => {
    	browserHistory.push('/user-confirmation')
    }
})

export const signUpConfirm = createAction('Confirm user', confirmUser, {
    onSuccess: () => {
        browserHistory.push('/')
    }
})

export const resendConfirmation = createAction('Resend confirmation code', resendConfirmationCode)

export const signIn = createAction('Sign in', userSignIn, {
    onSuccess: (result, getState) => {
    	browserHistory.push('/')
    },
    onFailure: (result, getState) => {
    	browserHistory.push('/login')
    }
})

export const signOut = createAction('Sign out', userSignOut, {
    onFinish: (result, getState) => {
        browserHistory.push('/login')
    }
})
