import { createReducersMap } from '../../../utils/action-promise-redux/reducerMap'
import * as Immutable from 'immutable'

import * as actions from './'

const resource = 'resource'

const initialState = Immutable.fromJS({})

export default createReducersMap([
    {
        actionsMap: [actions.fetchResource.success],
        handler: {
            reducer: resource
        }
    }
],{
    resource: (state, payload) => {
        return state.mergeDeep({
            [payload.url]: payload.data
        })
    }
}, initialState)
