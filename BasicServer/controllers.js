const fs = require('fs');


const add_new_user = (user) =>{
  fs.writeFile('users.json', JSON.stringify(user), (err)=>{
    if (err) console.log('could not write');

    return 'success';
  });
}

module.exports = {
  add_new_user,
}
