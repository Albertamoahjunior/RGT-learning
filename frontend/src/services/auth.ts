import axios from 'axios';

// Environment variable for API URL
const API_SERVICE = process.env.REACT_APP_API_URL  // Ensure this is defined in `.env`

// Define types for user response data
interface UserResponse {
  state: boolean | null;
  token?: string;
  userId?: string;
  username?: string;
}

const config = {
  withCredentials: true
}

// API service to Login
const login = async (username: string, password: string): Promise<UserResponse> => {
  const user = { username, password };

  try {
    const response = await axios.post(`http://${API_SERVICE}/login`, user, config);
    if (response.status === 200) {

      return {
        state: true,
        token: response.data.data.token,
        userId: response.data.data.id,
        username: response.data.data.username,
      };

    } else {
      return { state: false };
    }
  } catch (error) {
    return { state: null };
  }
};

// API service to Sign Up
const register = async (username: string, password: string): Promise<UserResponse> => {
  const user = { username, password };

  try {
    const response = await axios.post(`http://${API_SERVICE}/register`, user , config);
    if (response.status === 200) {
      return {
        state: true,
        token: response.data.data.token,
        userId: response.data.data.id,
        username: response.data.data.username,
      };
    } else {
      return { state: false };
    }
  } catch (error) {
    return { state: null };
  }
};

// API service to Log Out
const logout = async (): Promise<boolean | null | undefined> => {
  try {
    const response = await axios.get(`http://${API_SERVICE}/logout` , config);
    if(response.status === 200){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return  null;
  }
};

// API service to Refresh Token
const refresh = async (): Promise<UserResponse | undefined> => {

  try {
    const response = await axios.get(`http://${API_SERVICE}/refresh_token`, config);
    if (response.status === 200) {
      return {
        state: true,
        token: response.data.data.token,
        userId: response.data.data.id,
        username: response.data.data.username,
      };
    } else {
      return { state: false };
    }
  } catch (error) {
    return { state: null };
  }
};

// Define the service object
const apiService = {
  login,
  register,
  logout,
  refresh,
};

export default apiService;
