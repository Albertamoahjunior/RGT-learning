import {QueryResult} from 'pg';
import {Task, User} from './models';
import {pool_sec as pool} from './databaseConnection'

export async function register(username: string, password: string){
  try {
    const results:QueryResult<User> = await pool.query('INSERT INTO users (username, password) VALUES($1, $2) RETURNING *', [username, password]);
    return results.rows[0];
  } catch (error) {
    console.log( error);
    return;
  }
}

export async function get_user(username: string){
  try {
    const results:QueryResult<User> = await pool.query('SELECT * FROM users WHERE username = $1',[username]);
    return results.rows[0];
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function get_tasks(user_id: number){
  try {
    const results:QueryResult<Task> = await pool.query('SELECT * FROM task WHERE user_id=$1', [user_id]);
    return results.rows;
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function get_task_db(taskId: number, user_id: number){
  try {
    const results:QueryResult<Task> = await pool.query('SELECT * FROM task WHERE id = $1 AND user_id=$2',[taskId, user_id]);
    return results.rows[0];
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function add_task_db(title: string, task: string, user_id: number){
  try {
    const results:QueryResult<Task> = await pool.query('INSERT INTO task (title, task, user_id) VALUES($1, $2, $3) RETURNING *', [title, task, user_id]);
    return results.rows[0];
  } catch (error) {
    console.log( error);
    return;
  }
}

export async function delete_task_db(taskId: number, user_id: number){
  try {
    const results = await pool.query('DELETE FROM task WHERE id = $1 AND user_id=$2',[taskId, user_id]);
    return results
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function update_task_db(taskId: number, title:string, task: string, user_id: number){
  try {
    const results = await pool.query('UPDATE task SET title = $1, task = $2  WHERE id = $3 AND user_id=$4',[title, task, taskId, user_id]);
    return results
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function update_complete(taskId: number, user_id: number){
  try {
    const results = await pool.query('UPDATE task SET complete = $1 WHERE id = $2 AND user_id=$3',[true, taskId, user_id]);
    return results
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function update_unfinish(taskId: number, user_id:number){
  try {
    const results = await pool.query('UPDATE task SET complete = $1 WHERE id = $2 AND user_id=$3',[false, taskId, user_id]);
    return results
  } catch (error) {
    console.log( error)
    return;
  }
}
