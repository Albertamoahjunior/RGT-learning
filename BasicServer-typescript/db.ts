import fs from 'fs';
import {User} from './models';

//read file and return content
export async function general_read_file() :Promise<User[]>{
  try {
    let data = await fs.promises.readFile('users.json', 'utf8');
    let users: User[] = JSON.parse(data);
    return users;
  } catch (error) {
    throw new Error('Failed to read file');
  }
}


//write to file;
export async function general_write_file(users :User[]) :Promise<void> {
  try {
    await fs.promises.writeFile('users.json',  JSON.stringify(users), 'utf8');
  } catch (error) {
      throw new Error('failed to write');
  }
}

//check if exists
export function file_exist(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.readFile('users.json', 'utf8', (err) => {
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
