import { createAction, createPromisedAction } from '../../utils/action-promise-redux/createAction';
import {
    getUserSession,
    userSignUp,
    confirmUser,
    resendConfirmationCode,
    userSignIn,
    userSignOut
} from './authentication'

export const setDrawerState = createAction('Set drawer state')

export const restoreUserSession = createPromisedAction('Restore user session', getUserSession)
export const signUp = createPromisedAction('Sign up', userSignUp)
export const signUpConfirm = createPromisedAction('Confirm user', confirmUser)
export const resendConfirmation = createPromisedAction('Resend confirmation code', resendConfirmationCode)
export const signIn = createPromisedAction('Sign in', userSignIn)
export const signOut = createPromisedAction('Sign out', userSignOut)
