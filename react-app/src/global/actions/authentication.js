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

const getCognitoUser = (email) => {
    return new CognitoUser({
        Username: email,
        Pool: userPool
    });
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
            // Store cognitoUser in state
            return resolve(result.user)
        })
    })
}

export const userSignIn = (state, formInput) => {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: formInput.email,
            Password: formInput.password,
        });

        let cognitoUser = state.getIn(cognitoUserStatePath)
        if (!cognitoUser) {
            cognitoUser = getCognitoUser(formInput.email)
        }

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
                reject(err)
            },

        })
    })
}
