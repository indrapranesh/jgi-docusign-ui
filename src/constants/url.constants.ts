const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUrl = 'http://localhost:3000'
export const LOGIN_URL = `https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUrl}&grant_type=token`;