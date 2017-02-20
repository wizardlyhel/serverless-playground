import { Config, CognitoIdentityCredentials } from "aws-sdk"
import {
    CognitoUserPool,
    CognitoUserAttribute,
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js";

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

const getCognitoUser = (reject, getState, email) => {
    let cognitoUser = userPool.getCurrentUser()

    if (!cognitoUser) {
        email = email ? email : getState().app.getIn(['username'])

        return new CognitoUser({
            Username: email,
            Pool: userPool
        });
    }

    if (!cognitoUser) {
        reject('appError')
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
                return reject(err)
            }
            return resolve(formInputs.email)
        })
    })
}

export const confirmUser = (dispatch, getState, formInputs) => {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(reject, getState, formInputs && formInputs.email)
        cognitoUser.confirmRegistration(formInputs.confirmationCode, true, function(err, result) {
            if (err) {
                return reject(err)
            }
            return resolve(cognitoUser.getUsername())
        });
    })
}

export const resendConfirmationCode = (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(reject, getState)
        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                return reject(err)
            }
            return resolve(cognitoUser.getUsername())
        });
    })
}

const storeUserSession = (token) => {
    // Store access token
    Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId : config.IdentityPoolId,
        Logins : {
            [`cognito-idp.${config.region}.amazonaws.com/${config.UserPoolId}`]: token
        }
    });
}

export const userSignIn = (dispatch, getState, formInputs) => {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: formInputs.email,
            Password: formInputs.password,
        });

        const cognitoUser = getCognitoUser(reject, getState, formInputs && formInputs.email)

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                storeUserSession(result.getAccessToken().getJwtToken())
                resolve(cognitoUser.getUsername())
            },
            onFailure: function(err) {
                reject(err)
            },

        })
    })
}

export const userSignOut = (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(reject, getState)
        cognitoUser.signOut()
        resolve()
    })
}

export const getUserSession = () => {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser()
        if (cognitoUser) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    reject(err)
                }
                storeUserSession(session.getIdToken().getJwtToken())
                resolve(cognitoUser.getUsername())
            })
        }
        reject()
    })
}
