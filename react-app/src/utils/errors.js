const errorCodeMapping = (err) => {
    if (err.code) {
        switch(err.code) {
        	case 'InvalidPasswordException':
        		return 'awsError.invalidPassword'
        	case 'NotAuthorizedException':
        		return 'awsError.notAuthorized'
            case 'UsernameExistsException':
                return 'awsError.userExists'
            case 'ExpiredCodeException':
                return 'awsError.codeExpired'
            case 'CodeMismatchException':
                return 'awsError.codeMismatch'
            case 'UserNotFoundException':
                return 'awsError.userNotFound'
            default:
                return 'awsError.server'
        }
    }
    return err
}

export const handleError = (state, formName, payload) => {
    return state
        .setIn(['formErrors'], {
            [formName]: payload ? errorCodeMapping(payload) : payload
        })
}