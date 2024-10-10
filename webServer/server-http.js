const http = require('http');

 const server = http.createServer((req, res)=>{
   if(req.url === '/'){
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end('<h1>Great to see you all here</h1>');
   }
 })


const PORT = 5000;
 server.listen(PORT, ()=>{
   console.log('Server running on port 5000');
 })
