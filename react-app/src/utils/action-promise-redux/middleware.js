import omit from 'lodash.omit';

const META_NAME = 'redux-promise-action'

const handlePromise = (dispatch, getState, action) => {
    const { type, payload, meta } = action;

    if (typeof payload === 'function') {
        const newMeta = omit(meta, META_NAME)
        dispatch({
            type: `${type}|start`,
            payload: null,
            meta: newMeta
        })

        let resultPayload = payload(dispatch, getState)

        // Handle thunked promise
        while (typeof resultPayload === 'function' && !resultPayload.then) {
          resultPayload = resultPayload(dispatch, getState);
        }

        if (resultPayload.then) {            
            const success = data => {
                dispatch({
                    type: `${type}|success`,
                    payload: data,
                    meta: newMeta
                })
            }

            const failure = error => {
                dispatch({
                    type: `${type}|failed`,
                    payload: error,
                    error: true,
                    meta: newMeta
                })
            }

            return resultPayload.then(success, failure)
        }
    } else {
        return payload
    }
}

export const middleware = ({ dispatch, getState }) => next => action => {
    if (action.meta && action.meta[META_NAME] && action.meta[META_NAME].type === 'promise') {
        return handlePromise(dispatch, getState, action);
    }

    return next(action);
};
