import { createAction } from '../../utils/redux';
import { userlogin } from './authentication'

// Actions
export const login = createAction('Login', userlogin, {
    onSuccess: (result, getState) => {
    	console.log('Action success', result)
    },
    onFailure: (result, getState) => {
    	console.log('Action failed', result)
    }
})
