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
	ClientId: '644dum0m2taajer2n6nm4im77n'
}

// Set AWS region
Config.region = config.region

const userPool = new CognitoUserPool({
	UserPoolId: config.UserPoolId,
	ClientId: config.ClientId
});

export const userSignup = (formInput) => {
	return new Promise((resolve, reject) => {
		debugger
		userPool.signUp(formInput.username, formInput.password, null, null, (err, result) => {
			if (err) {
				debugger
				reject(err)
			}
			debugger
			resolve()
		})
	})
}

export const userlogin = (formInput) => {
    return new Promise((resolve, reject) => {
	    const authenticationDetails = new AuthenticationDetails({
	        Username: formInput.email,
	        Password: formInput.password,
	    });

	    const cognitoUser = new CognitoUser({
	        Username: formInput.email,
	        Pool: userPool
	    });

	    cognitoUser.authenticateUser(authenticationDetails, {
	        onSuccess: function (result) {
	            console.log('access token + ' + result.getAccessToken().getJwtToken());

	            // Store access token
	            // AWS.config.credentials = new CognitoIdentityCredentials({
	            //     IdentityPoolId : '...', // your identity pool id here
	            //     Logins : {
	            //         // Change the key below according to the specific region your user pool is in.
	            //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
	            //     }
	            // });

	            // Instantiate aws sdk service objects now that the credentials have been updated.
	            // example: var s3 = new AWS.S3();

	            resolve()
	        },
	        onFailure: function(err) {
	            reject()
	        },

	    })
    })
}
