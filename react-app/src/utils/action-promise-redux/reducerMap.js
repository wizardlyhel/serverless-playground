export const createReducersMap = (actionsMapping, reducers, initialState) => {
    let reducerMapping = {}

    actionsMapping.forEach((mapping) => {
        mapping.actionsMap.forEach((action) => {
            if (action) {
                if (!reducerMapping[action]) {
                    reducerMapping[action] = []
                }
                reducerMapping[action].push({
                    payloadTransform: mapping.handler.payloadTransform,
                    reducer: reducers[mapping.handler.reducer]
                })
            }
        })
    })

    if (process.env.NODE_ENV === 'development') {
        console.log(reducerMapping)
    }

    return (state = initialState, action) => {
        const {type, payload} = action

        if (reducerMapping.hasOwnProperty(type)) {
            reducerMapping[type].forEach((handler) => {
                state = handler.reducer(state, handler.payloadTransform ? handler.payloadTransform(type, payload) : payload)
            })
        }
        return state
    }
}
