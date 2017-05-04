import { createAction, createPromisedAction } from '../../../utils/action-promise-redux/createAction';
import {
    getUserSession,
    userSignUp,
    guestUserSignUp,
    confirmUser,
    resendConfirmationCode,
    guestUserSignIn,
    userSignIn,
    userSignOut
} from './authentication'

export const setDrawerState = createAction('Set drawer state')
export const showTerms = createAction('Show terms of agreement')

export const restoreUserSession = createPromisedAction('Restore user session', getUserSession)
export const signUp = createPromisedAction('Sign up', userSignUp)
export const guestSignUp = createPromisedAction('Guest sign up', guestUserSignUp)
export const signUpConfirm = createPromisedAction('Confirm user', confirmUser)
export const resendConfirmation = createPromisedAction('Resend confirmation code', resendConfirmationCode)
export const guestSignIn = createPromisedAction('Guest sign in', guestUserSignIn)
export const signIn = createPromisedAction('Sign in', userSignIn)
export const signOut = createPromisedAction('Sign out', userSignOut)
