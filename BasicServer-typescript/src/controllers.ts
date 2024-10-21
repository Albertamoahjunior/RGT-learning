import {Request, Response} from 'express';
import {User, UserSchema} from './models';
import {general_read_file, general_write_file, file_exist} from './db'

//function to get all users
async function get_all_users(req:Request, res:Response) :Promise<void>{
  try {
    let users: User[] = await general_read_file();

    if(!users){
      res.status(200).json({message: 'no users found', data: {}})
      return;
    }else{
      res.status(200).json({message: 'All users', data: users})
      return;
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({message:'server error', data: error});
    return;
  }
}

//function to get a user by id
async function get_user(req:Request, res:Response) :Promise<void>{
  try {
    const id:number = parseInt(req.params.id);
    let users: User[] = await general_read_file();

    if(!id){
      res.status(400).json({message:'bad requests no id number found', data: {}});
      return;
    }

    let user = users.find(user => user.id === id);

    if(user){
      res.status(200).json({message: 'user found', data: user});
      return;
    }else{
      res.status(404).json({message: 'user not found', data:{}});
      return;
    }
  } catch (error) {
    res.status(500).json({message:'server error', data: error});
    return;
  }
}

//function to add new user
async function add_user(req:Request, res:Response) :Promise<void>{
  try {
    const user :User = UserSchema.parse(req.body);

    if(!user){
      res.status(400).json({message:'bad request no user information body found', data: {}});
      return;
    }
    //try to read file if it exists first before writing to it
    if(!await file_exist()){
      await general_write_file([user]);
      res.status(201).json({message:'user added successfully' , data:{}});
      return;
    }else{
      let users :User[] = await general_read_file();

      let exist = users.find(exuser => exuser.id === user.id);

      if(!exist){
        users.push(user);

        await general_write_file(users);
        res.status(201).json({message:'user added successfully' , data:{}});
        return;
      }else{
        res.status(400).json({message:'user already exist' , data:{}});
        return;
      }
    }
  } catch (error) {
    res.status(500).json({message:'server error', data: error});
    return;
  }

}

//function to update user information
async function update_user(req:Request, res:Response) :Promise<void>{
  //check if user exists
  try {
    const id:number = parseInt(req.params.id);
    let users: User[] = await general_read_file();
    const user: User = req.body;

    if(!user || !id){
      res.status(400).json({message:'no user information not found', data:{}});
      return;
    }

    //take out old user information
    users = users.filter(user => user.id !== id);

    users.push(user);

    //write new file with updated users information
    await general_write_file(users);
    res.status(200).json({message:'user updated successfully', data:{}});
    return;

  } catch (error) {
    res.status(500).json({message:'Cannot update file' , data:error});
    return;
  }
}

//function to delete user
async function delete_user(req:Request, res:Response) :Promise<void>{
  //check if user exists
  try {
    const id:number = parseInt(req.params.id);
    let users: User[] = await general_read_file();

    if(!id){
      res.status(400).json({message:'bad request no user id submitted', data:{}});
      return;
    }

    users = users.filter(user => user.id !== id);

  //write new file with updated users information(removing the specified user)
    await general_write_file(users);
    res.status(200).json({message:'user information deleted successfully', data:{}});
    return;

  } catch (error) {
    res.status(500).json({message:'Cannot update file', data:error});
    return;
  }

}

// Function to edit user information
async function edit_user(req: Request, res: Response): Promise<void> {
  // Check if user exists
  try {
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
          res.status(200).json({message:'User information edited successfully', data:{}});
          return; // Ensure the function exits after response
        } catch (error) {
          res.status(500).json({message:'Cannot update file', data:error});
          return; // Stop further execution in case of error
        }
      } else {
        res.status(404).json({message:'User not found', data:{}});
        return; // Ensure the function exits after sending response
      }
    }

    res.status(400).json({message:'No field defined or incorrect field', data:{}});
    return; // Ensure the function exits
  } catch (error) {
    res.status(500).json({message:'Cannot update file', data:error});
    return;
  }

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
