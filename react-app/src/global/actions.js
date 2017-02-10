import { createAction } from './utils';
import { login as loginPromise } from './actions/authentication'

// Actions
export const login = createAction('Login', loginPromise, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})