const http = require('http');
const url = require('url');
const{add_new_user, get_all_users, get_user_by_id, delete_user} = require('./controllers.js');


const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (req.method === 'POST' && req.url === '/add-user') {
    let body = '';

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
}else if(req.method === 'DELETE' && pathname === '/user'){
  let id = query.id;

  // Check if the id is provided
  if (!id) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User ID is required' }));
      return;
  }

  try{

  }

}
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});





server.listen(5000, ()=>{
  console.log('Server running on port 5000');
})
