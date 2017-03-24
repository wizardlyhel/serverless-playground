const errorCode = {
    'InvalidPasswordException': 'awsError.invalidPassword',
    'NotAuthorizedException': 'awsError.notAuthorized',
    'UsernameExistsException': 'awsError.userExists',
    'ExpiredCodeException': 'awsError.codeExpired',
    'CodeMismatchException': 'awsError.codeMismatch',
    'UserNotFoundException': 'awsError.userNotFound'
}

const errorCodeMapping = (err) => {
    if (err.code) {
        if (errorCode.hasOwnProperty(err.code)) {
            return errorCode[err.code];
        } else {
            return 'awsError.server'
        }
    }
    return err
}

export const createErrorPayload= (formName, payload) => {
    return {
        err: payload, 
        formName
    }
}

export const handleError = (state, {err, formName}) => {
    return state.setIn(['formErrors', formName], err ? errorCodeMapping(err) : err)
}