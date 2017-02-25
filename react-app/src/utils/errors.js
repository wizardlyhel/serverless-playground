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

export const handleError = (state, payload) => {
    return state.setIn(['formErrors'], payload ? errorCodeMapping(payload) : payload)
}