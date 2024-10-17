import {Request, Response} from 'express';

//function to get all users
async function get_all_users(req:Request, res:Response) :Promise<void>{
  res.json('ok');
}

//function to get a user by id
async function get_user(req:Request, res:Response) :Promise<void>{
  res.json('ok');
}

//function to add new user
async function add_user(req:Request, res:Response) :Promise<void>{
  res.json('ok');
}

//function to update user information
async function update_user(req:Request, res:Response) :Promise<void>{
  res.json('ok');
}

//function to delete user
async function delete_user(req:Request, res:Response) :Promise<void>{
  res.json('ok');
}

//function to edit user information
async function edit_user(req:Request, res:Response) :Promise<void>{
  res.json('ok');
}


export default{
  get_all_users,
  get_user,
  add_user,
  update_user,
  delete_user,
  edit_user
}
