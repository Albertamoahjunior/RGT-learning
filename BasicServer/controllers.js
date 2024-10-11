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

    console.log(users);
  }catch(e){
    throw new Error(e);
  }
}

// const change_user_age
//
// const change_user_name

module.exports = {
  add_new_user,
  get_all_users,
  delete_user,
  get_user_by_id,
  //change_user_age,
  //change_user_name
}
