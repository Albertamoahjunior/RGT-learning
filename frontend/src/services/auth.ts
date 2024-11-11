import axios from 'axios';

// Define types for the API methods
type ApiService = {
  login: () => Promise<boolean | null>;
  register: () => Promise<boolean | null>;
  logout: () => Promise<boolean | null>;
  refresh: () => Promise<boolean | null>;
};

// API service to Login
const login: ApiService['login'] = async () => {
  // Make API calls
  try {
    // Then store the values
    localStorage.setItem('tasker-access-token', 'abcd');
    localStorage.setItem('user-id', '1');
    localStorage.setItem('username', 'albert');
    return true;
  } catch (error) {
    return null;
  }

};

// API service to sign up
const register: ApiService['register'] = async () => {
  // Make API calls
  try {
    // Then store the values
    localStorage.setItem('tasker-access-token', 'abcd');
    localStorage.setItem('user-id', '1');
    localStorage.setItem('username', 'albert');
    return true;
  } catch (error) {
    return null;
  }

};

// API service to log out
const logout: ApiService['logout'] = async () => {
  // Make API calls
  try {
    // Then remove the values
    localStorage.removeItem('tasker-access-token');
    localStorage.removeItem('user-id');
    localStorage.removeItem('username');
    return true;
  } catch (error) {
    return null;
  }
};

// API service to refresh token
const refresh: ApiService['refresh'] = async () => {
  // Make API calls
  try {
    // Then store the values
    localStorage.setItem('tasker-access-token', 'abcd');
    localStorage.setItem('user-id', '1');
    localStorage.setItem('username', 'albert');
    return true;
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
