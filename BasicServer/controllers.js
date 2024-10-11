const fs = require('fs');

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

const get_all_users = async () => {
  try{
    let data = await fs.promises.readFile('users.json', 'utf8');
    return JSON.parse(data);
  }catch(e){
    throw new Error(e);
  }
}

const get_user_by_id = async (id) => {
  try{
    let data = await fs.promises.readFile('users.json', 'utf8');
    let users = await JSON.parse(data);

    return users.find(user => user.id === id);
  }catch(e){
    throw new Error(e);
  }
}

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

const update_user =  async (id, userupdate) => {
  try{
    let data = await fs.promises.readFile('users.json', 'utf8');
    let users = await JSON.parse(data);

    let user = users.find(user => user.id === id);
    if(user){
      user = userupdate
      users = users.filter(user => user.id !== id);

      users.push(user);

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


// const change_user_name

module.exports = {
  add_new_user,
  get_all_users,
  delete_user,
  get_user_by_id,
  update_user,
  //change_user_name
}
