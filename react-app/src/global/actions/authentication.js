import { browserHistory } from 'react-router'
import { Config, CognitoIdentityCredentials } from "aws-sdk"
import {
    CognitoUserPool,
    CognitoUserAttribute,
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js";

import { signIn } from '../../global/actions/'

const navigate = (page) => {
    switch(page) {
        case 'home':
            browserHistory.push('/')
            return
        case 'login':
            browserHistory.push('/login')
            return
        case 'accessInfo':
            browserHistory.push('/access-info')
            return
        case 'userConfirm':
            browserHistory.push('/user-confirmation')
            return
        default:
            return
    }
}

const guestPassword = 'guestUser1!'

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

const storeUserSession = (token) => {
    // Store access token
    Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId : config.IdentityPoolId,
        Logins : {
            [`cognito-idp.${config.region}.amazonaws.com/${config.UserPoolId}`]: token
        }
    });
}

export const userSignUp = (formInputs) => {
    return new Promise((resolve, reject) => {
        const attributeList = [
            cognitoUserAttribute('email', formInputs.email)
        ]

        userPool.signUp(formInputs.email, formInputs.password, attributeList, null, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(formInputs.email)
            navigate('userConfirm')
        })
    })
}

export const guestUserSignUp = (formInputs) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const email = getState().app.getIn(['username'])
        const attributeList = [
            cognitoUserAttribute('email', email),
            cognitoUserAttribute('given_name', formInputs.firstname),
            cognitoUserAttribute('family_name',formInputs.lastname),
            cognitoUserAttribute('address', formInputs.address)
        ]

        userPool.signUp(email, guestPassword, attributeList, null, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(email)
            navigate('userConfirm')
        })
    })
}

export const confirmUser = (formInputs) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(reject, getState, formInputs && formInputs.email)
        cognitoUser.confirmRegistration(formInputs.confirmationCode, true, function(err, result) {
            if (err) {
                reject(err)
                navigate('login')
            }

            if (getState().app.getIn(['isGuest'])) {
                dispatch(signIn({
                    email: formInputs.email,
                    password: guestPassword
                }))
            } else {
                resolve(cognitoUser.getUsername())
                navigate('home')
            }
        })
    })
}

export const resendConfirmationCode = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(reject, getState)
        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                reject(err)
            }
            resolve(cognitoUser.getUsername())
        });
    })
}

export const guestUserSignIn = (formInputs) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: formInputs.email,
            Password: guestPassword,
        });

        const cognitoUser = getCognitoUser(reject, getState, formInputs && formInputs.email)

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                storeUserSession(result.getAccessToken().getJwtToken())
                resolve(cognitoUser.getUsername())
            },
            onFailure: function (err) {
                if (err.code === 'UserNotFoundException') {
                    reject({
                        username: formInputs.email,
                        err
                    })
                    navigate('accessInfo')
                } else {
                    reject(err)
                }
            }
        })
    })
}

export const userSignIn = (formInputs) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: formInputs.email,
            Password: formInputs.password,
        });

        const cognitoUser = getCognitoUser(reject, getState, formInputs.email)

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                storeUserSession(result.getAccessToken().getJwtToken())
                resolve(cognitoUser.getUsername())
            },
            onFailure: reject
        })
    })
}

export const userSignOut = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(reject, getState)
        cognitoUser.signOut()
        resolve()
        navigate('login')
    })
}

export const getUserSession = () => {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser()
        if (cognitoUser) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    reject(err)
                    navigate('login')
                }
                storeUserSession(session.getIdToken().getJwtToken())
                resolve(cognitoUser.getUsername())
            })
        } else {
            reject()
        }
    })
}
