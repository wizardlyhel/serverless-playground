import { createAction } from './utils';
import { loginPromise1, loginPromise2, loginPromise4 } from './actions/authentication'

// Actions
export const login = createAction('Login', loginPromise1, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})

export const loginV2 = createAction('Login V2', loginPromise2, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})

export const loginV3 = createAction('Login V3', null, {actionMeta: true})

export const loginForm = createAction('Login Form', loginPromise4, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})