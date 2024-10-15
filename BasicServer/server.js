const http = require('http');
const url = require('url');
const cors = require('cors');
const{add_new_user, get_all_users, get_user_by_id, delete_user, update_user, patch_user} = require('./controllers.js');

//create server with the http module
const server = http.createServer(async (req, res) => {
  const allowed = 'http://127.0.0.1:8080'

  res.setHeader('Access-Control-Allow-Origin', allowed);
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;


  //add new users
  if (req.method === 'POST' && req.url === '/add-user') {
    var body = '';

    req.on('data', data => {
      body += data;
    });

    req.on('end', async () => {
      try {
        const userData = JSON.parse(body);
        const addUser = await add_new_user(userData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: addUser }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON or Error adding user', error }));
      }
    });
  }

  //get all users
  else if (req.method === 'GET' && req.url === '/users') {
    try {
      const users = await get_all_users(); // Now await works properly
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ users }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error retrieving users', error }));
    }
  }

  //get a single user
  else if (req.method === 'GET' && pathname === '/user') {
    let id = query.id;

    // Check if the id is provided
    if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User ID is required' }));
        return;
    }

    try {
        let user = await get_user_by_id(id);

        // Check if the user exists
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'User not found' }));
        }
    } catch (error) {
        // Handle any errors that occurred in get_user_by_id
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  }
  //delete a user id
  else if(req.method === 'DELETE' && pathname === '/user'){
      let id = query.id;

      // Check if the id is provided
      if (!id) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'User ID is required' }));
          return;
      }

      try{
          let status = await delete_user(id);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({message: status}));
      }catch(e){
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }

  }

  //update specific user
  else if(req.method === 'PUT' && pathname === '/update-user'){
    let id = query.id;
    var update = '';

    req.on('data', data =>{
      update += data;
    });

    req.on('end', async ()=>{
      try {
        const user_update = await update_user(id, JSON.parse(update));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: user_update }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON or Error adding user', error }));
      }
    })
  }

  //patch user
  else if(req.method === 'PATCH' && pathname === '/patch-user'){
    let id = query.id;
    let field = query.field;

    var patch = '';

    req.on('data', data =>{
      patch += data;
    });

    req.on('end', async ()=>{
      try {
        const user_patch = await update_user(id, JSON.parse(patch), field);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: user_patch }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON or Error adding user', error }));
      }
    })
  }

  //default when cannot recognize path
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = 2000;

//start server on the specified port 5000
server.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})
