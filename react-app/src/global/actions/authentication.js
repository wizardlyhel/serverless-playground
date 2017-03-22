import { browserHistory } from 'react-router'
import { Config, CognitoIdentityCredentials } from "aws-sdk"
import {
    CognitoUserPool,
    CognitoUserAttribute,
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js";

const navigate = (page) => {
    switch(page) {
        case 'home':
            browserHistory.push('/')
            return
        case 'login':
            browserHistory.push('/login')
            return
        case 'userConfirm':
            browserHistory.push('/user-confirmation')
            return
        default:
            return
    }
}

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
                reject(err)
            }
            resolve(formInputs.email)
            navigate('userConfirm')
        })
    })
}

export const confirmUser = (formInputs) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = getCognitoUser(reject, getState, formInputs && formInputs.email)
            cognitoUser.confirmRegistration(formInputs.confirmationCode, true, function(err, result) {
                if (err) {
                    reject(err)
                    navigate('login')
                }
                resolve(cognitoUser.getUsername())
                navigate('home')
            })
        })
    }
}

export const resendConfirmationCode = () => {
    return (dispatch, getState) => {
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

export const userSignIn = (formInputs) => {
    return (dispatch, getState) => {
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
                    navigate('home')
                },
                onFailure: function(err) {
                    reject(err)
                },

            })
        })
    }
}

export const userSignOut = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = getCognitoUser(reject, getState)
            cognitoUser.signOut()
            resolve()
            navigate('login')
        })
    }
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
                navigate('home')
            })
        } else {
            reject()
            navigate('login')
        }
    })
}

    // {
    //     actionsMap: [
    //         appActions.signIn.success,
    //         appActions.signIn.failed,
    //         appActions.signOut,
    //         appActions.signUp.success,
    //         appActions.signUpConfirm.success,
    //         appActions.restoreUserSession.success,
    //         appActions.restoreUserSession.failed
    //     ],
    //     handler: {
    //         reducer: authenticated,
    //         payloadTransform: (type) => {
    //             switch(type) {
    //                 case appActions.signIn.success:
    //                 case appActions.signUpConfirm.success:
    //                 case appActions.restoreUserSession.success:
    //                     browserHistory.push('/')
    //                     return
    //                 case appActions.signIn.failed:
    //                 case appActions.signOut:
    //                 case appActions.restoreUserSession.failed:
    //                     browserHistory.push('/login')
    //                     return
    //                 case appActions.signUp.success:
    //                     browserHistory.push('/user-confirmation')
    //                     return
    //                 default:
    //                     return
    //             }
    //         }
    //     }
    // },
