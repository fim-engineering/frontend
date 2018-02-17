/* eslint-disable import/prefer-default-export, no-unused-vars */
import axios from 'axios';
import querystring from 'querystring';
import * as _ from 'lodash';

const HOSTNAME = 'https://fim-backend.herokuapp.com/api'

const FIM_SERVICES = {
  Login: `${HOSTNAME}/login`,
  SignUp: `${HOSTNAME}/signup`,
  Logout: `${HOSTNAME}/logout`
};

const configFetch = (url, method, body, isJSON = false, extraHeaders = {}) => ({
  method,
  url,
  data: isJSON ? body : querystring.stringify(body),
  headers: {
    'Content-Type': isJSON ? 'application/json' : 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    ...extraHeaders
  }
});

const Login = (content) => {
  const url = FIM_SERVICES.Login;
  
  return axios(configFetch(url, 'post', content))
    .then(response => response.data)
    .catch(err => {
      return {
        user: 
        { 
          id: 0,
          message_error: _.result(err, 'response.data.errors.email[0]', 'Gagal Login')
        }
      }
    })
}

const SignUp = (content) => {
  const url = FIM_SERVICES.SignUp;
  
  return axios(configFetch(url, 'post', content, true))
    .then(response => response.data)
    .catch(err => {
      return {
        user: 
        { 
          id: 0,
          message_error: _.result(err, 'response.data.errors.email[0]', 'Gagal Daftar')
        }
      }
    })
}

const Logout = (content) => {
  const url = FIM_SERVICES.Logout;
  const extraHeaders = {
    Authorization: `Bearer ${content}`
  }

  console.log('extraHeaders===: ', extraHeaders);
  
  return axios(configFetch(url, 'post', content, false, extraHeaders))
    .then(response => response.data)
    .catch(err => {
      return {
        message: 'Gagal Logout'
      }
    })
}

export {
  Login,
  SignUp,
  Logout
}