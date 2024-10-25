import fs from 'fs';
import {Task} from './models';

//read file and return content
export async function general_read_file() :Promise<Task[]>{
  try {
    let data = await fs.promises.readFile('tasks.json', 'utf8');
    let tasks: Task[] = JSON.parse(data);
    return tasks;
  } catch (error) {
    throw new Error('Failed to read file');
  }
}


//write to file;
export async function general_write_file(tasks :Task[]) :Promise<void> {
  try {
    await fs.promises.writeFile('tasks.json',  JSON.stringify(tasks), 'utf8');
  } catch (error) {
      throw new Error('failed to write');
  }
}

//check if exists
export function file_exist(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.readFile('tasks.json', 'utf8', (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false);  // File does not exist
        } else {
          reject(err);  // Handle other errors
        }
      } else {
        resolve(true);  // File exists
      }
    });
  });
}
