import { createReducer } from 'redux-act';
import { createAction, mergeDeep } from './utils';
import {Map, List} from 'immutable'

const initialState = Map({
    locale: 'en'
})

// Actions
export const setLocal = createAction('Set locale', 'locale')

// Reducers
export default createReducer({
	[setLocal]: mergeDeep
}, initialState)