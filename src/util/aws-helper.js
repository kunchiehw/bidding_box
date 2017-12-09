import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import config from '../config';


const userPool = new CognitoUserPool({
  UserPoolId: config.aws.userPool.USER_POOL_ID,
  ClientId: config.aws.userPool.APP_CLIENT_ID,
});
const LOGINS_URL = `cognito-idp.${config.aws.identityPool.REGION}.amazonaws.com/${config.aws.userPool.USER_POOL_ID}`;
AWS.config.region = config.aws.identityPool.REGION;


export const authenticateUser = (username, password) => new Promise((resolve, reject) => {
  const authData = {
    Username: username,
    Password: password,
  };
  const authDetails = new AuthenticationDetails(authData);
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authDetails, {
    onSuccess: (result) => {
      console.log(`access token + ${result.getAccessToken().getJwtToken()}`);

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.aws.identityPool.IDENTITY_POOL_ID,
        Logins: { [LOGINS_URL]: result.getIdToken().getJwtToken() },
      });

      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Successfully logged!');
        }
      });

      resolve(result);
    },
    onFailure: (err) => {
      reject(err);
    },
  });
});


export const getSession = () => new Promise((resolve, reject) => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        reject();
        return;
      }
      console.log(`session validity: ${session.isValid()}`);

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.aws.identityPool.IDENTITY_POOL_ID,
        Logins: { [LOGINS_URL]: session.getIdToken().getJwtToken() },
      });

      resolve(session);
    });
  }
});


export const signOut = () => new Promise((resolve) => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.signOut();
    resolve();
  }
});
