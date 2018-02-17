/* eslint-disable import/prefer-default-export, no-unused-vars */
import axios from 'axios';
import querystring from 'querystring';
import * as _ from 'lodash';

const HOSTNAME = 'https://fim-backend.herokuapp.com/api'

const FIM_SERVICES = {
  Login: `${HOSTNAME}/login`,
  SignUp: `${HOSTNAME}/signup`
};

const configFetch = (url, method, body, isJSON = false) => ({
  method,
  url,
  data: isJSON ? body : querystring.stringify(body),
  headers: {
    'Content-Type': isJSON ? 'application/json' : 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
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

export {
  Login,
  SignUp
}