import deline from 'deline';
import invariant from 'invariant';
import { handle } from 'redux-pack';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';

export const mergeDeep = (state, payload) => {
    return state.mergeDeep({
        ...payload
    })
}

// Convinent function to create actions and argument reducer for redux-pack
// Usage:
//
// login = (user, pass) => { return a promise }
//
// createAction('Login', loginPromse, {
//     onStart: (result, getState) => {},
//     onFinish: (result, getState) => {},
//     onSuccess: (result, getState) => {},
//     onFailure: (result, getState) => {}
// })
//
// dispatch(login('user', 'pass'))
//
// Created action function can be use to identify reducer as well
//
// description      Action identifier
// payload          A promise handler or payload
// meta             Side effect functions (optional)
//
// Reducer with the same action identifier will update app state
export const createAction = (description, payload, initMeta) => {
    let actionCreator
    let initPayload = {
        type: description,
        meta: initMeta
    }

    if (isString(payload)) {
        actionCreator = (args, meta) => {
            invariant(isPlainObject(args), deline`
                The ${initPayload.type} action is expected a plain object as first argument.
            `);

            return {
                type: initPayload.type,
                payload: args,
                meta: {
                    ...initPayload.meta,
                    ...meta
                }
            }
        }
    } else {
        actionCreator = (...args) => {
            return {
                ...initPayload,
                promise: payload(...args)
            }
        }
    }

    actionCreator.toString = () => description

    return actionCreator
}
 
// Convient function to create reducers for redux-pack
// Usage:
//
// const login = createAction('Login', loginPromse)
// const loginV2 = createAction('Login V2', loginPromse)
// const loginV3 = createAction('Login V3', {token: 'ABC'})
// const signup = createAction('Sign up', signInPromse)
//
// createReducers({
//     loginV2: login,
//     loginV3: 'Default',
//     login: {
//         start: state => { return state },
//         success: state => { return state },
//         failure: state => { return state },
//         finish: state => { return state },
//         always: state => { return state }
//     },
//     signup: {
//         start: state => { return state },
//         success: state => { return state },
//         failure: state => { return state },
//         finish: state => { return state },
//         always: state => { return state }
//     },
//     'Default': mergeDeep
// }, initialState)
//
// handlers         Reducer handlers
// initialState
export const createReducers = (handlers, initialState) => {
    return (state = initialState, action) => {
        const { type, payload } = action;

        if (handlers.hasOwnProperty(type)) {
            let handler = handlers[type]
            let isPromiseHandler = isPlainObject(handler)

            while (!isPromiseHandler) {
                const testHandler = handlers[handler]
                
                if (!testHandler) {
                    break;
                }

                handler = testHandler
                isPromiseHandler = isPlainObject(handler)
            }

            if (isPromiseHandler) {
                return handle(state, action, handler)
            } else {
                return handler(state, payload)
            } 
        } else {
            return state
        }
    }
}

