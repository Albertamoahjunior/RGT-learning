import axios, { AxiosRequestConfig } from 'axios';
import { Task } from '../models/task';
import Auth from './auth';
import { useAuthContext } from '../context/authContext';

const API_SERVICE = process.env.REACT_APP_API_URL;

const useTaskService = () => {
  const { authParcel, setAuthParcel } = useAuthContext();

  // Axios instance
  const axiosInstance = axios.create({
    baseURL: `http://${API_SERVICE}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor for handling token refreshing
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // prevent retry loop

        // Attempt to refresh the token
        const refresh = await Auth.refresh();
        if (refresh && refresh.state) {
          // Update token in context
          setAuthParcel({
            token: refresh.token ?? "",
            user_id: refresh.userId ?? "",
            username: refresh.username ?? "",
          });

          // Update original request with new token
          originalRequest.headers['Authorization'] = refresh.token;
          return axiosInstance(originalRequest); // Retry original request
        }
      }

      return Promise.reject(error); // Return any other errors
    }
  );

  // Helper function for setting auth headers
  const setAuthHeader = (token: string): AxiosRequestConfig => ({
    headers: {
      'Authorization': token,
    },
    withCredentials: true,
  });

  // CRUD functions
  const fetchTasks = async (): Promise<Task[] | null> => {
    const { token, user_id } = authParcel;
    if (!token || !user_id) return null;
    try {
      const response = await axiosInstance.get(`/tasks/${user_id}`, setAuthHeader(token));
      return response.data.data;
    } catch (error) {
      return null;
    }
  };

  const addTask = async (task: Task): Promise<Task | null> => {
    const { token } = authParcel;
    if (!token) return null;
    try {
      const response = await axiosInstance.post('/tasks/task', task, setAuthHeader(token));
      return response.data.data;
    } catch (error) {
      return null;
    }
  };

  const editTask = async (task: Task): Promise<Task | null> => {
    const { token } = authParcel;
    if (!token) return null;
    try {
      const response = await axiosInstance.put(`/tasks/task/${task.id}`, task, setAuthHeader(token));
      return response.data.data;
    } catch (error) {
      return null;
    }
  };

  const deleteTask = async (taskId: number): Promise<boolean> => {
    const { token, user_id } = authParcel;
    if (!token || !user_id) return false;
    try {
      await axiosInstance.delete(`/tasks/task/${taskId}?user=${user_id}`, setAuthHeader(token));
      return true;
    } catch (error) {
      return false;
    }
  };

  const completeTask = async (taskId: number): Promise<boolean> => {
    const { token, user_id } = authParcel;
    if (!token || !user_id) return false;
    try {
      await axiosInstance.patch(`/tasks/task/${taskId}/unfinish?user=${user_id}`, undefined, setAuthHeader(token));
      return true;
    } catch (error) {
      return false;
    }
  };

  const unfinishTask = async (taskId: number): Promise<boolean> => {
    const { token, user_id } = authParcel;
    if (!token || !user_id) return false;
    try {
      await axiosInstance.patch(`/tasks/task/${taskId}/complete?user=${user_id}`, undefined, setAuthHeader(token));
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    fetchTasks,
    addTask,
    editTask,
    deleteTask,
    completeTask,
    unfinishTask,
  };
};

export default useTaskService;
