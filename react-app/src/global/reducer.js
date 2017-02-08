import { createReducer } from 'redux-act';
import { mergeDeep } from './utils';
import {Map, List} from 'immutable'

import { appActions } from './actions'

const initialState = Map({
    loggedIn: false
})

// Reducers
export default createReducer({
	[appActions.loginSuccess]: (state) => {
		return state.set('loggedIn', true)
	},
	[appActions.loginFailed]: (state) => {
		return state.set('loggedIn', false)
	}
}, initialState)