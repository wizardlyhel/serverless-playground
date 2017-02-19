import { createAction } from '../../utils/redux';
import { browserHistory } from 'react-router'
import { userSignUp, confirmUser, resendConfirmationCode, userSignIn } from './authentication'

// Actions
export const signUp = createAction('Sign up', userSignUp, {
    onSuccess: (result, getState) => {
    	browserHistory.push('/user-confirmation')
    }
})

export const signUpConfirm = createAction('Confirm user', confirmUser, {
    onSuccess: (result, getState) => {
        browserHistory.push('/')
    }
})

export const resendConfirmation = createAction('Confirm user', resendConfirmationCode)

export const signIn = createAction('Sign in', userSignIn, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})

export const signOut = createAction('Sign out')
