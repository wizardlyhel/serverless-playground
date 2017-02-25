const unique = (value, index, self) => { 
    return self.indexOf(value) === index;
}

export const createReducersMap = (actionsMapping, reducers, initialState) => {
	let reducerMapping = {}

	actionsMapping.forEach((mapping) => {
		mapping.actionsMap.forEach((action) => {
			if (action) {
				let existingReducers = reducerMapping[action] || []
				reducerMapping[action] = existingReducers.concat(mapping.reducersMap).filter(unique)
			}
		})
	})

	if (process.env.NODE_ENV === 'development') {
		console.log(reducerMapping)
	}

	return (state = initialState, action) => {
		const {type, payload} = action

		if (reducerMapping.hasOwnProperty(type)) {
			reducerMapping[type].forEach((reducer) => {
				state = reducers[reducer](state, payload)
			})
			return state
		}
		return state
	}
}



// a group of actions can execute the same set of reducers
// an action can execute multiple reducers
// [{
// 	actions: [action1, action2, action4],
// 	reducers: [reducer1]
// }, {
// 	actions: [action2, action3],
// 	reducers: [reducer2, reducer3]
// }]

// action1 -> reducer1
// action4 -> reducer1
// action2 -> reducer1, reducer2, reducer3
// action3 -> reducer2, reducer3


// moduler reducers that should only mutate state one property at a time
// reducer1 => (path, payload)
// reducer2
// reducer3
// reducer4

// return state