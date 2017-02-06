import { createAction as reduxAction } from 'redux-act';

// Standardize redux-act createAction method - converts all payload to JSON payload
// usage: createAction('Update Campaign', 'id', 'update')
// instead of: createAction('Update Campaign', (id, update) => ({id, update}))
export const createAction = (description, ...argNames) => {
    let payloadReducer

    if (argNames.length) {
        payloadReducer = (...args) => {
            const payload = {}

            argNames.forEach((arg, index) => {
                payload[arg] = args[index]
            })

            return payload
        }
    }

    return reduxAction(description, payloadReducer)
}

export const mergeDeep = (state, payload) => {
    return state.mergeDeep({
        ...payload
    })
}
