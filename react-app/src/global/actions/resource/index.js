import { createPromisedAction } from '../../../utils/action-promise-redux/createAction';

import {
    fetchS3Resource
} from './resource'

export const fetchResource = createPromisedAction('Fetch Resource', fetchS3Resource)
