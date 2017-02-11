import { handle } from 'redux-pack';
import isString from 'lodash/isString';

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
// promise          Action handler
// meta             Side effect functions (optional)
//
// Reducer with the same action identifier will update app state
export const createAction = (description, promise, meta) => {
    function actionCreator (...args) {
        return {
            type: description,
            promise: promise(...args),
            meta
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
// const loginV3 = createAction('Login V2', loginPromse)
// const signup = createAction('Sign up', signInPromse)
//
// createReducers({
//     loginV2: login,
//     loginV3: login,
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
//     }
// }, initialState)
//
// handlers         Reducer handlers
// initialState
export const createReducers = (handlers, initialState) => {
    return (state = initialState, action) => {
        const { type } = action;

        if (handlers.hasOwnProperty(type)) {
            let handler = handlers[type]

            while (!(handler.start || handler.success || handler.failure || handler.finish || handler.always)) {
                handler = handlers[handler]
            }

            return handle(state, action, handler)
        } else {
            return state
        }
    }
}

