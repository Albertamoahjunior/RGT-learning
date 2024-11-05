import {QueryResult} from 'pg';
import {Task} from './models';
import pool from './databaseConnection'


export async function get_tasks(){
  try {
    const results:QueryResult<Task> = await pool.query('SELECT * FROM task');
    return results.rows;
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function get_task_db(taskId: number){
  try {
    const results:QueryResult<Task> = await pool.query('SELECT * FROM task WHERE id = $1',[taskId]);
    return results.rows[0];
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function add_task_db(title: string, task: string){
  try {
    const results:QueryResult<Task> = await pool.query('INSERT INTO task (title, task) VALUES($1, $2) RETURNING *', [title, task]);
    return results.rows[0];
  } catch (error) {
    console.log( error);
    return;
  }
}

export async function delete_task_db(taskId: number){
  try {
    const results = await pool.query('DELETE FROM task WHERE id = $1',[taskId]);
    return results
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function update_task_db(taskId: number, title:string, task: string){
  try {
    const results = await pool.query('UPDATE task SET title = $1, task = $2  WHERE id = $3',[title, task, taskId]);
    return results
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function update_complete(taskId: number){
  try {
    const results = await pool.query('UPDATE task SET complete = $1 WHERE id = $2',[true, taskId]);
    return results
  } catch (error) {
    console.log( error)
    return;
  }
}

export async function update_unfinish(taskId: number){
  try {
    const results = await pool.query('UPDATE task SET complete = $1 WHERE id = $2',[false, taskId]);
    return results
  } catch (error) {
    console.log( error)
    return;
  }
}
