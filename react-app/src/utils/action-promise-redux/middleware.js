// Stripped down version of https://github.com/lelandrichardson/redux-pack/blob/master/src/middleware.js
const handlePromise = (dispatch, getState, action) => {
    const { type, payload, meta } = action;

    dispatch({
        type: `${type}|start`,
        payload: null,
        meta
    })

    const success = data => {
        dispatch({
            type: `${type}|success`,
            payload: data,
            meta
        })
    }

    const failure = error => {
        dispatch({
            type: `${type}|failed`,
            payload: error,
            error: true,
            meta
        })
    }

    return payload.then(success, failure);
}

export const middleware = store => next => action => {
    // a common use case for redux-thunk is to conditionally dispatch an action. By allowing for null,
    // we satisfy this use case without people having to use redux-thunk.
    if (action == null) {
        return null;
    }

    // this is the convention-based promise middleware. Ideally, all "async actions" would go through
    // this pathway.
    if (action.payload && action.payload.then) {
        return handlePromise(store.dispatch, store.getState, action);
    }

    // this is the "vanilla redux" pathway. These are plain old actions that will get sent to reducers
    return next(action);
};
