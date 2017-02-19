import { cognitoUserStatePath } from './state-paths';

const awsCognitoErrorCodeMapping = (err) => {
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
            default:
                return 'awsError.server'
        }
    }
    return err
}

export const handleAWSCognitoError = (state, formName, payload) => {
    if (payload && payload.cognitoUser) {
        state = state.setIn(cognitoUserStatePath, payload.cognitoUser)
    }
    return state.setIn(['formErrors', formName], payload && payload.error ? awsCognitoErrorCodeMapping(payload.error) : payload)

}