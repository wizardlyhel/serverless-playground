import { createAction } from '../../utils/redux';
import { userSignup, userLogin } from './authentication'

// Actions
export const signUp = createAction('Sign up', userSignup, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})

export const login = createAction('Login', userLogin, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})
