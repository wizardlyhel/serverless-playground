import deline from 'deline';
import invariant from 'invariant';
import { handle } from 'redux-pack';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';

export const mergeDeep = (state, payload) => {
    return state.mergeDeep({
        ...payload
    })
}

// Convinent function to create actions
//
// Usage: Create a promisified action
//
// login = (user, pass) => { return new Promise((resolve, reject) => { resolve(true) } }
//
// createAction('Login', login, {
//     onStart: (result, getState) => {},
//     onFinish: (result, getState) => {},
//     onSuccess: (result, getState) => {},
//     onFailure: (result, getState) => {}
// })
//
// dispatch(login('user', 'pass'))
//
// Usage: Create an action (FSA)
//
// const close = createAction('Close')
//
// dispatch(close({arg: 'arg 1'}))
//
// description      [String]            Action identifier
// payload          [Promise | Object]  A promise handler or payload
// initalMeta       [Object]            Side effect functions (optional)
export const createAction = (description, payload = 'payload', initMeta) => {
    let actionCreator
    let initPayload = {
        type: description,
        meta: initMeta
    }

    if (!payload || isString(payload)) {
        actionCreator = (args, meta) => {
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
 
// Convient function to create reducers
// Usage:
//
// const login = createAction('Login', loginPromse)
// const loginV2 = createAction('Login V2', loginPromse)
// const loginV3 = createAction('Login V3', {token: 'ABC'})
// const signup = createAction('Sign up', signInPromse)
//
// createReducers({
//     loginV2: login,                          <== Reducer redirect to Login reducer
//     loginV3: 'Default',                      <== Reducer redirect to Default reducer
//     login: {
//         start: (state, { payload }) => { return state },
//         success: (state, { payload }) => { return state },
//         failure: (state, { payload }) => { return state },
//         finish: (state, { payload }) => { return state },
//         always: (state, { payload }) => { return state }
//     },
//     signup: {                                <== Promise reducers
//         start: (state, { payload }) => { return state },
//         success: (state, { payload }) => { return state },
//         failure: (state, { payload }) => { return state },
//         finish: (state, { payload }) => { return state },
//         always: (state, { payload }) => { return state }
//     },
//     Default: mergeDeep                       <== Function follows (state [, payload]) => { return state }
// }, initialState)
//
// handlers         [Object]    Reducer handlers
// initialState     [Object]    Initial state
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

