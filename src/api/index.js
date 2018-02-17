/* eslint-disable import/prefer-default-export, no-unused-vars */
import axios from 'axios';
import querystring from 'querystring';

const HOSTNAME = 'https://fim-backend.herokuapp.com/api'

const FIM_SERVICES = {
  Login: `${HOSTNAME}/login`,
  SignUp: `${HOSTNAME}/signup`,
};

const configFetch = (url, method, body) => ({
  method,
  url,
  data: querystring.stringify(body),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const Login = (content) => {
  const url = FIM_SERVICES.Login;
  
  return axios(configFetch(url, 'post', content)).then(response => {
    console.log("response==: ", response)
    return response.data
  });
}

export {
  Login
}