import config from './config.js';
import login from './login';
import Axios from '../../node_modules/axios';

export default {
  getAll () {
    const requestOptions = {
      method: 'GET',
      headers: login.getAuthHeader()
    };
    
    return Axios.get(`${config.API_URL}ap/all`, requestOptions).then(this.handleResponse);
  },
  getCount () {
    const requestOptions = {
      method: 'GET',
      headers: login.getAuthHeader()
    };
    
    return Axios.get(`${config.API_URL}ap/count`, requestOptions).then(this.handleResponse);
  },
  handleResponse (response) {
    
   
    const data = response.data;
    
    if (!response.data) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        localStorage.removeItem('user');
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    
    return data;
  
  },
};