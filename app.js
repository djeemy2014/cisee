import express from 'express'
import fs from 'fs'
import http from 'http'

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.dir(__filename)
console.log('directory-name 👉️', __dirname);

// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
//console.log(path.join(__dirname, '/dist', 'index.html'));



const app=express()
const host='10.0.5.190'
const hostname = 'localhost' //'10.0.5.190'//'djeemy.testserver.com'
const port= 18077
console.log(app.listen)
const optionsPath={ root: __dirname }
const options = {
  host: host,
  hostname: hostname,
  port: port,
  path: '/',
  method: 'GET'
}


    // eventually this mime type configuration will need to change
    // https://github.com/visionmedia/send/commit/d2cb54658ce65948b0ed6e5fb5de69d022bef941
    // *NOTE* Any changes you make here must be mirrored in web.config.
const mime = express.static.mime;
    mime.define({
            "application/json": ["czml", "json", "geojson", "topojson"],
            "application/wasm": ["wasm"],
            "image/ktx2": ["ktx2"],
            "model/gltf+json": ["gltf"],
            "model/gltf-binary": ["bgltf", "glb"],
            "application/octet-stream": [
                "b3dm",
                "pnts",
                "i3dm",
                "cmpt",
                "geom",
                "vctr",
            ],
            "text/plain": ["glsl"],
        },
        true
    );


app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
//app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use('/module',express.static(__dirname + '/node_modules/cesium/Build/Cesium'));
app.use('/cesium_test',express.static(__dirname + '/skript/cesium_test'));

//сюда пишеться метод ля вставки head в любую странийцу
//app.head('/head/',function(req,res) {
//  res.sendFile('/head.html',optionsPath);
//  console.dir(req.ip)
//});
app.get('/',function(req,res) {
  res.sendFile('./index.html',optionsPath);
  console.dir(req.ip)
});
app.get('/skript/fetchPKK_1/',function(req,res) {
  res.sendFile('./skript/fetchPKK_1.html',optionsPath);
  console.dir(req.ip)
})
app.get('./skript/cesium_test/Test_1.html',function(req,res) {
  res.sendFile('./skript/cesium_test/Test_1.html',optionsPath);
  console.dir(req.ip)
})
app.get('/creaet_project',function(req,res){
  res.sendFile('skript\\js\\creaet_project.js',optionsPath)
})
/* app.get('/module',function(req,res){
  res.use('./node_modules/cesium/Build/Cesium')
  console.dir(req)
  console.dir(res)
}) */

app.listen(port, () => {
  console.log(`listening on host ${host} port ${port}`)
  console.log(`http://${host}:${port}/`)

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