// Modified version of https://github.com/acdlite/redux-actions/blob/master/src/createAction.js
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import invariant from 'invariant';

export function createAction(type, payloadCreator = (arg) => (arg), metaCreator) {
    invariant(
        isFunction(payloadCreator),
        'Expected payloadCreator to be a function, undefined or null'
    );

    const actionCreator = (...args) => {
        const hasError = args[0] instanceof Error;

        const action = {
            type
        };

        const payload = hasError ? args[0] : payloadCreator(...args);
        if (!isUndefined(payload)) {
            action.payload = payload;
        }

        if (hasError || payload instanceof Error) {
            // Handle FSA errors where the payload is an Error object. Set error.
            action.error = true;
        }

        if (isFunction(metaCreator)) {
            action.meta = metaCreator(...args);
        }

        return action;
    };

    actionCreator.toString = () => type.toString();
    actionCreator.start = `${type}|start`
    actionCreator.success = `${type}|success`
    actionCreator.failure = `${type}|failure`

    return actionCreator;
}
