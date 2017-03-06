// Modified version of https://github.com/acdlite/redux-actions/blob/master/src/createAction.js
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import invariant from 'invariant';

export function createAction(type, payloadCreator, metaCreator) {
    const actionCreator = (...args) => {
        debugger
        let action = {
            type
        }

        if (isFunction(payloadCreator)) {
            action.payload = payloadCreator.bind(this, ...args)
        } else {
            action.payload = (...args)
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
            payload: promise.bind(this, ...args).bind(this, ...args)
        }

        if (isFunction(metaCreator)) {
            action.meta = metaCreator(...args)
        }

        return action
    }

    actionCreator.toString = () => type.toString();
    actionCreator.start = `${type}|start`
    actionCreator.success = `${type}|success`
    actionCreator.failure = `${type}|failure`

    return actionCreator;
}