// Oauth Login 
const REDIRECT_URI = 'http://localhost:3000/';
const USER_SCOPE = `signature%20user_read%20user_write%20group_read`;
const INTEGRATION_KEY = process.env.REACT_APP_DOCUSIGN_INTEGRATION_KEY;
export const USER_LOGIN_URL = `https://account-d.docusign.com/oauth/auth?response_type=token&scope=${USER_SCOPE}&client_id=${INTEGRATION_KEY}&redirect_uri=${REDIRECT_URI}`;

//Backend Url 
export const BASE_URL = `http://localhost:5000/`;

export const API_URL = {
    SEND_ENVELOPE: 'envelope/send',
    GET_AUDITS: 'audits',
    GET_ENVEOPES: (id: number) => `review/envelopes/${id}`,
    GET_USERS: 'group/users'
}


export const DOCUSIGN_URL = `https://demo.docusign.net/restapi/v2.1/accounts/${process.env.REACT_APP_DOCUSIGN_ACCOUNT_ID}/`;

export const DOCUSIGN_PATHS = {
    LIST_GROUPS: 'groups'
}