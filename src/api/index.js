/* eslint-disable import/prefer-default-export, no-unused-vars */
import axios from 'axios';
import querystring from 'querystring';
import * as _ from 'lodash';

const HOSTNAME = 'https://fim-backend.herokuapp.com/api'

const FIM_SERVICES = {
  Login: `${HOSTNAME}/login`,
  SignUp: `${HOSTNAME}/signup`,
  Logout: `${HOSTNAME}/logout`,
  UpdateProfile: `${HOSTNAME}/myprofile/update`,
  getKota: 'http://dev.farizdotid.com/api/daerahindonesia/provinsi'
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

const UpdateProfile = (content) => {
  const url = FIM_SERVICES.UpdateProfile;
  
  const extraHeaders = {
    Authorization: `Bearer ${content.token}`
  }

  return axios(configFetch(url, 'put', content, true, extraHeaders))
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

const getKota = () => {
  const url = FIM_SERVICES.getKota
  const options = {
    method: 'get',
    url,
  }

  return axios(options)
    .then(response => {
      console.log("response API: ", response);
      return response.semuaprovinsi
    })
    .catch(err => {
      console.log("err: ", err);
      return []
    })
}

export {
  Login,
  SignUp,
  Logout,
  getKota,
  UpdateProfile
}