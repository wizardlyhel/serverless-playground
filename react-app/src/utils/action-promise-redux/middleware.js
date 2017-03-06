// Stripped down version of https://github.com/lelandrichardson/redux-pack/blob/master/src/middleware.js
const handlePromise = (dispatch, getState, action) => {
    const { type, payload, meta } = action;
    const error = payload instanceof Error ? true : undefined

debugger
    const resultPayload = payload(dispatch, getState)
    if (resultPayload.then) {
        dispatch({
            type: `${type}|start`,
            payload: null,
            error,
            meta
        })
        
        const success = data => {
            dispatch({
                type: `${type}|success`,
                payload: data,
                error,
                meta
            })
        }

        const failure = error => {
            dispatch({
                type: `${type}|failed`,
                payload: error,
                error,
                meta
            })
        }

        return resultPayload.then(success, failure)
    } else {
        return resultPayload
    }
}

export const middleware = ({ dispatch, getState }) => next => action => {
    // a common use case for redux-thunk is to conditionally dispatch an action. By allowing for null,
    // we satisfy this use case without people having to use redux-thunk.
    if (action == null) {
        return null;
    }

    // react-thunk path
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    // this is the convention-based promise middleware. Ideally, all "async actions" would go through
    // this pathway.
    if (typeof action.payload === 'function') {
        return handlePromise(dispatch, getState, action);
    }

    // this is the "vanilla redux" pathway. These are plain old actions that will get sent to reducers
    return next(action);
};
