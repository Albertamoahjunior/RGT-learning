import axios from 'axios';
import Cookies from 'js-cookie';


const refreshToken: string | undefined = Cookies.get('refreshToken');
const API_SERVICE = process.env.REACT_APP_API_URL;

// Define types for the API methods
type ApiService = {
  login: (username: string, password: string) => Promise<any>;
  register: (username: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  refresh: () => Promise<any>;
};

// API service to Login
const login: ApiService['login'] = async (username: string, password: string) => {

  const user = {
    username : username,
    password : password
  }


  try {
    // Make API calls
    const response = await axios.post(`http://${API_SERVICE}/login`, user);

    if(response.status === 200){
      // Then store the values
      localStorage.setItem('tasker-access-token', response.data.data.token);
      localStorage.setItem('user-id', response.data.data.id);
      localStorage.setItem('username', response.data.data.username);

      return true;
    }else{
      return false;
    }
  } catch (error) {
    return null;
  }

};

// API service to sign up
const register: ApiService['register'] = async (username: string, password: string) => {

  const user = {
    username : username,
    password : password
  }

  try {
    // Make API calls
    const response =  await axios.post(`http://${API_SERVICE}/register`, user);
    if(response.status === 200){
      // Then store the values
      localStorage.setItem('tasker-access-token', response.data.data.token);
      localStorage.setItem('user-id', response.data.data.id);
      localStorage.setItem('username', response.data.data.username);

      return true;
    }else{
      return false;
    }
  } catch (error) {
    return null;
  }

};

// API service to log out
const logout: ApiService['logout'] = async () => {

  try {
    // Make API calls
    const response =  await axios.get(`http://${API_SERVICE}/logout`);
    if(response.status === 200){
      // Then remove the values
      localStorage.removeItem('tasker-access-token');
      localStorage.removeItem('user-id');
      localStorage.removeItem('username');
      return true;
  }
  } catch (error) {
    return null;
  }
};

// API service to refresh token
const refresh: ApiService['refresh'] = async () => {
  try {
    if(!refreshToken){
      return undefined; //this is to alert which ever function that called to redirect to the login page
    }else{
        // Make API calls
        const response =  await axios.get(`http://${API_SERVICE}/refresh_token`);
        if(response.status === 200){
          // Then store the values
          localStorage.setItem('tasker-access-token', response.data.data.token);
          localStorage.setItem('user-id', response.data.data.id);
          localStorage.setItem('username', response.data.data.username);

          return true;
        }else{
          return false;
        }
    }
  } catch (error) {
    return null;
  }
};

// Define the service object
const apiService: ApiService = {
  login,
  register,
  logout,
  refresh
};

export default apiService;
