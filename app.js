import express from 'express'
import fs from 'fs'
import http from 'http'

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);

// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
//console.log(path.join(__dirname, '/dist', 'index.html'));



const app=express()
const hostname = 'localhost' //'10.0.5.190'//'djeemy.testserver.com'
const port= 18077
console.log(app.listen)
const optionsPath={ root: __dirname }
const options = {
  host: '10.0.5.190',
  //hostname: hostname,
  port: port,
  path: '/',
  method: 'GET'
}
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
//app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res) {
  res.sendFile('./index.html',optionsPath);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/* const req =http.get(options,
  /* (res)=>{
  console.log(res)
  console.log('запустил')
} 
)
req.end(); */
/* const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', (d) => {
    process.stdout.write(d)
  })
})
req.on('error', (error) => {
  console.error(error)
})
req.end() */