export interface Task{
  id: number;
  title: string;
  task: string;
  date: string;
  complete: boolean;
  user_id: number;
}

export interface User{
  id: number;
  username: string;
  password: string;
}
