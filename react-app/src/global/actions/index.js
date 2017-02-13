import { createAction } from '../../utils/redux';
import { userSignUp, userSignIn } from './authentication'

// Actions
export const signUp = createAction('Sign up', userSignUp, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})

export const signIn = createAction('Sign in', userSignIn, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})

export const signOut = createAction('Sign out')
