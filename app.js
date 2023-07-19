import express from 'express'
import fs from 'fs'
import http from 'http'
import pg from 'pg';

import path from 'path';
import {fileURLToPath} from 'url';
import { send } from 'process';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.dir(__filename)
console.log('directory-name 👉️', __dirname);

// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
//console.log(path.join(__dirname, '/dist', 'index.html'));



const app=express()
const host='10.0.1.56'
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

function updatebd() {
  var urs = './skript/cesium_test/geodata/geojson/test_point_4326.geojson' //ссылка на файл для перезаписи
      //запрос
  var sql = 'SELECT json_build_object(\'type\', \'FeatureCollection\', \'name\',\'test_point_4326\', \'crs\', json_build_object( \'type\', \'name\',  \'properties\', json_build_object( \'name\', \'urn:ogc:def:crs:OGC:1.3:CRS84\' ) ), \'features\', json_agg(ST_AsGeoJSON(public."test_point_4326".*)::json))from public."test_point_4326";'

  const client = new pg.Client({
      user: 'dda',
      password: 'dda',
      host: '10.0.1.10',
      database: 'CommonDB',
      port: 5432,
  });
  client.connect(err => {
      if (err) {
          console.error('connection error', err.stack)
      } else {
          console.log('connected')
              //document.write('connected')
      }
  })

  client.query(sql, (err, res) => {
      if (err) throw err
          //response.status(200).json(res.rows[0].json_build_object)

      //console.log(geojson_01)

      let geojson_01 = JSON.stringify(res.rows[0].json_build_object)

      fs.writeFile(urs, geojson_01, (err) => {
          if (err) throw err;
          console.log('The file has been saved! при запуске сайта', new Date());
          //var loggood = 'The file has been saved!2'


      });
      //document.body.innerHTML ="<h1>"+res.rows[0].json+"</h1>"
      client.end()
  })
}

function loger(req,res){
  let data = new Date()
  let log={href: req.url, ipv6: req.ip, date: data , date_strint:`${data}`}
  return console.dir(log)
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
app.use(function(req,res,next){
  const regexp_1=/cesium_test\/Test/
  if (regexp_1.test(req.url)){
    loger(req);
  }
  next()
})
app.use(express.static(__dirname + '/public'));
app.use('/module',express.static(__dirname + '/node_modules/cesium/Build/Cesium'));
app.use('/cesium_test', [
  express.static(__dirname + '/skript/cesium_test'),
  ()=>{console.log('2Ghbdtn')},
]
);
//app.use(console.log(0))
/* app.get('(\\S)*',function(req,res){
  loger(req,res)
} ) */

//сюда пишеться метод ля вставки head в любую странийцу
//app.head('/head/',function(req,res) {
//  res.sendFile('/head.html',optionsPath);
//  loger(req,res)
//});
app.get('/',function(req,res) {
  res.sendFile('./index.html',optionsPath);
  console.log('/', req.ip,  new Date())
  loger(req,res)
  //console.log(req)
});
app.get('/skript/fetchPKK_1/',function(req,res) {
  res.sendFile(`./skript/fetchPKK_1.html`,optionsPath);
  loger(req,res)
})
app.get('/skript/fetchPKK_10/',function(req,res) {
  res.sendFile(`./skript/fetchPKK_10.html`,optionsPath);
  loger(req,res)
})
// Нужно сохранять позицию и посылать ее вместе с запросом, затем прехватывать ее и фиксировать (Lon,Lat,H)
app.get('./cesium_test/Test_1.html',function(req,res) {
  res.sendFile('./cesium_test/Test_1.html',optionsPath);
  loger(req,res)
})
app.get('/creaet_project',function(req,res){
  res.sendFile('skript\\js\\creaet_project.js',optionsPath)
})
/* app.get('/module',function(req,res){
  res.use('./node_modules/cesium/Build/Cesium')
  console.dir(req)
  console.dir(res)
}) */
setInterval(updatebd,36e5)
updatebd();

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