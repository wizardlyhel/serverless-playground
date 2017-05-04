// Modified version of https://github.com/acdlite/redux-actions/blob/master/src/createAction.js
import isFunction from 'lodash/isFunction';

export function createAction(type, payloadCreator, metaCreator) {
    const actionCreator = (...args) => {
        let action = {
            type
        }

        if (isFunction(payloadCreator)) {
            action.payload = payloadCreator.bind(this, ...args)
        } else {
            action.payload = args[0]
        }

        if (isFunction(metaCreator)) {
            action.meta = metaCreator(...args)
        }

        return action
    }

    actionCreator.toString = () => type.toString();

    return actionCreator;
}

export function createPromisedAction(type, promise, metaCreator) {
    const actionCreator = (...args) => {
        let action = {
            type,
            payload: promise.bind(this, ...args),
            meta: {
                'redux-promise-action': {
                    type: 'promise'
                }
            }
        }

        if (isFunction(metaCreator)) {
            const moreMeta = metaCreator(...args)
            action.meta = {
                ...action.meta,
                ...moreMeta
            }
        }

        return action
    }

    actionCreator.toString = () => type.toString();
    actionCreator.start = `${type}|start`
    actionCreator.success = `${type}|success`
    actionCreator.failed = `${type}|failed`

    return actionCreator;
}