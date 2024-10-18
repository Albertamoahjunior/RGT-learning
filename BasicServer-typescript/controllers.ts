import {Request, Response} from 'express';
import {User} from './models';
import {general_read_file, general_write_file, file_exist} from './db'

//function to get all users
async function get_all_users(req:Request, res:Response) :Promise<void>{
  res.json(await general_read_file());
}

//function to get a user by id
async function get_user(req:Request, res:Response) :Promise<void>{
  const id:number = parseInt(req.params.id);
  let users: User[] = await general_read_file();

  if(!id){
    res.status(400).json('id not found')
  }

  let user = users.find(user =>{
    if(user.id === id){
      res.json(user);
    }else{
      res.json('user not found');
    }
  })
}

//function to add new user
async function add_user(req:Request, res:Response) :Promise<void>{
  const user :User = req.body;


  if(!user){
    res.status(400).json('no user body not found');
  }
  //try to read file if it exists first before writing to it
  if(!await file_exist()){
    await general_write_file([user]);
    res.json('user added successfully');
  }else{
    let users :User[] = await general_read_file();
    users.push(user);

    await general_write_file(users);
    res.json('user added successfully');
  }
}

//function to update user information
async function update_user(req:Request, res:Response) :Promise<void>{
  //check if user exists
  const id:number = parseInt(req.params.id);
  let users: User[] = await general_read_file();
  const user: User = req.body;

  if(!user || !id){
    res.status(400).json('no user information not found');
  }

  users = users.filter(user => user.id !== id);

  users.push(user);

  //write new file with updated users information
  try {
    await general_write_file(users);
    res.json('user information updated successfully')
  } catch (error) {
    res.status(500).json('Cannot update file')
  }
}

//function to delete user
async function delete_user(req:Request, res:Response) :Promise<void>{
  //check if user exists
  const id:number = parseInt(req.params.id);
  let users: User[] = await general_read_file();

  if(!id){
    res.status(400).json('no user id');
  }

  users = users.filter(user => user.id !== id);

//write new file with updated users information(removing the specified user)
  try {
    await general_write_file(users);
    res.json('user information deleted successfully')
  } catch (error) {
    res.status(500).json('Cannot update file')
  }
}

// Function to edit user information
async function edit_user(req: Request, res: Response): Promise<void> {
  // Check if user exists
  const id: number = parseInt(req.query.id as string);
  let users: User[] = await general_read_file();
  const info: any = req.body;
  const field: string | undefined = typeof req.query.field === 'string' ? req.query.field : undefined;

  if (!info || !id) {
    res.status(400).json('No user information or ID provided');
    return; // Stop further execution after sending response
  }

  // Ensure field and info[field] are both defined
  if (field !== undefined && info[field] !== undefined) {
    // Get the user
    let user: User | undefined = users.find(user => user.id === id);

    if (user) {
      // Remove the existing user from the array
      users = users.filter(user => user.id !== id);

      // Update the field dynamically
      (user as any)[field] = info[field];

      // Push the updated user back into the users array
      users.push(user);

      // Write new file with updated user information
      try {
        await general_write_file(users);
        res.json('User information edited successfully');
        return; // Ensure the function exits after response
      } catch (error) {
        res.status(500).json('Cannot update file');
        return; // Stop further execution in case of error
      }
    } else {
      res.status(404).json('User not found');
      return; // Ensure the function exits after sending response
    }
  }

  res.status(400).json('No field defined or incorrect field');
  return; // Ensure the function exits
}

//export all functions to be used throughout the file
export default{
  get_all_users,
  get_user,
  add_user,
  update_user,
  delete_user,
  edit_user
}
