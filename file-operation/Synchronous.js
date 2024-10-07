const fs = require('fs');


//reading files
try{
  let data = fs.readFileSync('sample-read.txt', 'utf8');
  console.log(data);
}catch(err){
  console.log('Error reading file synchronously');
}

//writing FileSync
data = 'synchronous file Writing';
try{
  fs.writeFileSync('sample-write-sync.txt', data, 'utf8');
  console.log('file written successfully');
}catch(err){
  console.log('file failed to be written synchronously');
}
