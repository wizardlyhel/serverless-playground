// import { appActions } from '../actions'

// import { Config, CognitoIdentityCredentials } from "aws-sdk"
// import {
// 	CognitoUserPool,
// 	CognitoUserAttribute,
// 	AuthenticationDetails,
// 	CognitoUser
// } from "amazon-cognito-identity-js";

// import appConfig from "../../config/config";
// Config.region = appConfig.region;
// Config.credentials = new CognitoIdentityCredentials({
// 	IdentityPoolId: appConfig.IdentityPoolId
// });

// const userPool = new CognitoUserPool({
// 	UserPoolId: appConfig.UserPoolId,
// 	ClientId: appConfig.ClientId,
// });

// export const login = (formInput) => {
//     return (dispatch) => {
// 	    const authenticationDetails = new AuthenticationDetails({
// 	        Username : formInput.email,
// 	        Password : formInput.password,
// 	    });

// 	    const cognitoUser = new CognitoUser({
// 	        Username : formInput.email,
// 	        Pool : userPool
// 	    });

// 	    cognitoUser.authenticateUser(authenticationDetails, {
// 	        onSuccess: function (result) {
// 	            console.log('access token + ' + result.getAccessToken().getJwtToken());

// 	            // Store access token
// 	            // AWS.config.credentials = new CognitoIdentityCredentials({
// 	            //     IdentityPoolId : '...', // your identity pool id here
// 	            //     Logins : {
// 	            //         // Change the key below according to the specific region your user pool is in.
// 	            //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
// 	            //     }
// 	            // });

// 	            // Instantiate aws sdk service objects now that the credentials have been updated.
// 	            // example: var s3 = new AWS.S3();
// 	            dispatch(appActions.loginSuccess())
// 	        },
// 	        onFailure: function(err) {
// 	            dispatch(appActions.loginFailed())
// 	        },

// 	    })
//     }
// }

export const loginPromise1 = (user, pass) => {
	return new Promise(function(resolve, reject) {
		resolve('Login success - ' + user) // resolve with states you want to update
	})
}

export const loginPromise2 = (user, pass) => {
	return new Promise(function(resolve, reject) {
		resolve('Login success - ' + user) // resolve with states you want to update
	})
}

export const loginPromise3 = (user, pass) => {
	return new Promise(function(resolve, reject) {
		resolve('Login success - ' + user) // resolve with states you want to update
	})
}

export const loginPromise4 = (user, pass) => {
	return new Promise(function(resolve, reject) {
		resolve('Login success - ' + user) // resolve with states you want to update
	})
}





