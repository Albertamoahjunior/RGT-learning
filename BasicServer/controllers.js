const fs = require('fs');


//function to add new users
const add_new_user = (user) =>{
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
      fs.writeFile('users.json', JSON.stringify([user]), (err)=>{
        if (err) return 'failed';
      });
      return 'success';
    }
  }
  let users = [];
  users = JSON.parse(data);


  if(users.find(exist => exist.id === user.id)){
    return 'user already exist';
  }

  users.push(user);
    fs.writeFile('users.json', JSON.stringify(users), (err)=>{
      if (err) return 'failed';
    });
    return 'success';
  });

}

//function to get all users
const get_all_users = async () => {
  try{
    let data = await fs.promises.readFile('users.json', 'utf8');
    return JSON.parse(data);
  }catch(e){
    throw new Error(e);
  }
}

//functipn to get a specific user
const get_user_by_id = async (id) => {
  try{
    let data = await fs.promises.readFile('users.json', 'utf8');
    let users = await JSON.parse(data);

    return users.find(user => user.id === id);
  }catch(e){
    throw new Error(e);
  }
}

//function to delete a specific user
const delete_user = async (id) => {
  try{
    let data = await fs.promises.readFile('users.json', 'utf8');
    let users = await JSON.parse(data);

    users = users.filter(user => user.id !== id);
    if(users){
      fs.writeFile('users.json', JSON.stringify(users), (err)=>{
        if (err) return 'failed';
      });
      return 'success';
    }else{
      return 'no such user'
    }

  }catch(e){
    throw new Error(e);
  }
}

//function to update user
const update_user =  async (id, userupdate) => {
  try{
    let data = await fs.promises.readFile('users.json', 'utf8');
    let users = await JSON.parse(data);

    let user = users.findIndex(user => user.id === id);

    if(user !== -1){
      users[user] = { ...users[user], ...userupdate };

      fs.writeFile('users.json', JSON.stringify(users), (err)=>{
        if (err) return 'failed';
      });
      return 'success';
    }else{
      return 'no such user';
    }


  }catch(e){
    throw new Error(e);
  }
}

//function to patch user
const patch_user = async (id, patch, field) =>{
  try{
    let data = await fs.promises.readFile('users.json', 'utf8');
    let users = await JSON.parse(data);

    let user = users.findIndex(user => user.id === id);

    if(user !== -1){
      users[user].field = patch.field;
      fs.writeFile('users.json', JSON.stringify(users), (err)=>{
        if (err) return 'failed';
      });
      return 'success';
    }else{
      return 'no such user';
    }


  }catch(e){
    throw new Error(e);
  }
}


//export functions  to be used by main/server
module.exports = {
  add_new_user,
  get_all_users,
  delete_user,
  get_user_by_id,
  update_user,
  patch_user
}
