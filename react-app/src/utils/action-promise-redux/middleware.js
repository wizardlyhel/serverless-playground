import omit from 'lodash.omit';
// Stripped down version of https://github.com/lelandrichardson/redux-pack/blob/master/src/middleware.js
const handlePromise = (dispatch, getState, action) => {
    const { type, payload, meta } = action;
    const error = payload instanceof Error ? true : undefined

    if (typeof payload === 'function') {
        let resultPayload = payload(dispatch, getState)
        while (typeof resultPayload === 'function' && !resultPayload.then) {
          resultPayload = resultPayload(dispatch, getState);
        }

        const newMeta = omit(meta, 'action-promise-redux')

        if (resultPayload.then) {
            dispatch({
                type: `${type}|start`,
                payload: null,
                error,
                newMeta
            })
            
            const success = data => {
                dispatch({
                    type: `${type}|success`,
                    payload: data,
                    error,
                    newMeta
                })
            }

            const failure = error => {
                dispatch({
                    type: `${type}|failed`,
                    payload: error,
                    error,
                    newMeta
                })
            }

            return resultPayload.then(success, failure)
        }
    } else {
        return payload
    }
}

export const middleware = ({ dispatch, getState }) => next => action => {
    // a common use case for redux-thunk is to conditionally dispatch an action. By allowing for null,
    // we satisfy this use case without people having to use redux-thunk.
    if (action == null) {
        return null;
    }

    // this is the convention-based promise middleware. Ideally, all "async actions" would go through
    // this pathway.
    if (action.meta && action.meta['action-promise-redux'] && action.meta['action-promise-redux'].type === 'promise') {
        return handlePromise(dispatch, getState, action);
    }

    // react-thunk path
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    // this is the "vanilla redux" pathway. These are plain old actions that will get sent to reducers
    return next(action);
};
