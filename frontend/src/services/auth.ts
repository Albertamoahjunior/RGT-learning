// import dotenv from 'dotenv';
// import axios from 'axios';
//
// dotenv.config();

// Define types for the API methods
type ApiService = {
  login: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

// API service to Login
const login: ApiService['login'] = async () => {
  // Make API calls

  // Then store the values
  localStorage.setItem('tasker-access-token', 'abcd');
  localStorage.setItem('user-id', '1');
  localStorage.setItem('username', 'albert');
};

// API service to sign up
const register: ApiService['register'] = async () => {
  // Make API calls

  // Then store the values
  localStorage.setItem('tasker-access-token', 'abcd');
  localStorage.setItem('user-id', '1');
  localStorage.setItem('username', 'albert');
};

// API service to log out
const logout: ApiService['logout'] = async () => {
  // Make API calls

  // Then remove the values
  localStorage.removeItem('tasker-access-token');
  localStorage.removeItem('user-id');
  localStorage.removeItem('username');
};

// API service to refresh token
const refresh: ApiService['refresh'] = async () => {
  // Make API calls

  // Then store the values
  localStorage.setItem('tasker-access-token', 'abcd');
  localStorage.setItem('user-id', '1');
  localStorage.setItem('username', 'albert');
};

// Define the service object
const apiService: ApiService = {
  login,
  register,
  logout,
  refresh
};

export default apiService;
