const awsCognitoErrorCodeMapping = (err) => {
    switch(err.code) {
    	case 'InvalidPasswordException':
    		return 'awsError.invalidPassword'
    	case 'NotAuthorizedException':
    		return 'awsError.notAuthorized'
        case 'UsernameExistsException':
            return 'awsError.userExists'
        default:
            return 'awsError.server'
    }
}

export const handleAWSCognitoError = (state, formName, payload) => {
    return state.setIn(['formErrors', formName], payload ? awsCognitoErrorCodeMapping(payload) : payload)
}