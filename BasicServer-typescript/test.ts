import fs from 'fs';
import { User } from './models';

//read file and return content
async function general_read_file() :Promise<User[]>{
  let data = await fs.promises.readFile('users.json', 'utf8');
  let users: User[] = JSON.parse(data);
  return users;
}

general_read_file()
.then(users => {
  console.log(users);
})
