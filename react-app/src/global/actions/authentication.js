import { Config, CognitoIdentityCredentials } from "aws-sdk"
import {
    CognitoUserPool,
    CognitoUserAttribute,
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js";

import { cognitoUserStatePath } from '../../utils/state-paths';

const config = {
    region: 'us-west-2',
    UserPoolId: 'us-west-2_IfgqwF39A',
    ClientId: '644dum0m2taajer2n6nm4im77n',
    IdentityPoolId: 'us-west-2:df5dd931-af87-49d0-a5ce-a88da963383c'
}

// Set AWS region
Config.region = config.region

const userPool = new CognitoUserPool({
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId
});

const cognitoUserAttribute = (name, value) => {
    return new CognitoUserAttribute({
        Name: name,
        Value: value
    })
}

export const getCognitoUser = (getState, email) => {
    let cognitoUser = getState().app.getIn(cognitoUserStatePath)

    if (!cognitoUser && email) {
        return new CognitoUser({
            Username: email,
            Pool: userPool
        });
    }

    return cognitoUser
}

export const userSignUp = (formInputs) => {
    return new Promise((resolve, reject) => {
        const attributeList = [
            cognitoUserAttribute('email', formInputs.email)
        ]

        userPool.signUp(formInputs.email, formInputs.password, attributeList, null, (err, result) => {
            if (err) {
                return reject({error: err})
            }
            // Store cognitoUser in state
            return resolve(result.user)
        })
    })
}

export const confirmUser = (cognitoUser, formInputs) => {
    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(formInputs.confirmationCode, true, function(err, result) {
            if (err) {
                return reject({
                    error: err,
                    cognitoUser
                })
            }
            return resolve(cognitoUser)
        });
    })
}

export const resendConfirmationCode = (cognitoUser) => {
    return new Promise((resolve, reject) => {
        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                return reject({
                    error: err,
                    cognitoUser
                })
            }
            return resolve(cognitoUser)
        });
    })
}

export const userSignIn = (cognitoUser, formInputs) => {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: formInputs.email,
            Password: formInputs.password,
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                // Store access token
                Config.credentials = new CognitoIdentityCredentials({
                    IdentityPoolId : config.IdentityPoolId,
                    Logins : {
                        [`cognito-idp.${config.region}.amazonaws.com/${config.UserPoolId}`]: result.getAccessToken().getJwtToken()
                    }
                });

                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();
                debugger
                resolve(result.user)
            },
            onFailure: function(err) {
                debugger
                reject({error: err})
            },

        })
    })
}

// Proxy function to get Cognito User from state
export const userAuthenticationProxy = (payload) => {
    return (dispatch, getState) => {
        const formInputs = payload.formInputs
        const cognitoUser = getCognitoUser(getState, formInputs && formInputs.email)

        dispatch(payload.action(cognitoUser, formInputs))
    }
}
