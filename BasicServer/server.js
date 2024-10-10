const http = require('http');
const routes = require('./routes');
const{add_new_user} = require('./controllers.js');

//create a server
const server = http.createServer((req, res)=>{
    if(req.method === 'POST' && req.url === '/add-user'){

      var body;

      req.on('data',  data =>{
        body += data;
      })


      req.on('end', async () => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        //console.log(body);
        let addUser = await add_new_user(body);
        if(addUser === 'success') res.end(JSON.stringify({message: 'successfully written'}));
        else res.end(JSON.stringify({message: 'failed'}));
      })
    }
  }
)




server.listen(5000, ()=>{
  console.log('Server running on port 5000');
})
