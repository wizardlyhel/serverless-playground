import { createAction, createPromisedAction } from '../../../utils/action-promise-redux/createAction';

import {
    fetchS3Resource,
    convertS3ResourcesInHTML
} from './resource'

export const updateResource = createPromisedAction('Update Resource', convertS3ResourcesInHTML)
export const fetchResource = createPromisedAction('Fetch Resource', fetchS3Resource)
