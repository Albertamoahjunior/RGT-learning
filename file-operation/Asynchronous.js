const fs = require('fs');

fs.readFile('sample-read.txt', 'utf8', (err, data)=>{
  if(err){
    console.log('Read file error');
  }
  console.log(data);
})

//here we will write a normal tasks or a synchronous tasks
console.log('This is the normal tasks.');

let data = 'Eugene Duodu is his mentor';

fs.writeFile('sample-write.txt', data, 'utf8', (err)=>{
  if(err){
    console.log('Writing file error');
  }
  console.log('File written successfully');
})
