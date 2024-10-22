import express from 'express'
import fs from 'fs'
import http from 'http'
import pg from 'pg';
import cors from 'cors';

import path from 'path';
import {fileURLToPath} from 'url';
import timeout from 'connect-timeout'
//import { send } from 'process';


import {abcd} from './app/models/ceziumSee/ceziumSeeApp.js'
import zu_point from './skript/js/split_point_plase_shp.js'
import redLine from './skript/js/split_point_red_line_shp.js'
import joinSplitZU from './skript/js/join_in_excel.js'
import creaetProject from './skript/js/creaet_project.js'

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.dir(__filename)
console.log('directory-name 👉️', __dirname);

// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
//console.log(path.join(__dirname, '/dist', 'index.html'));



const app=express()
const urlencodedParser = express.urlencoded({extended: false});
const host='10.0.1.56'
const hostname = 'localhost' //'10.0.5.190'//'djeemy.testserver.com'
const port= 18077
console.log(app.listen)
const optionsPath={ root: __dirname }
const options = {
  host: hostname,
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
  let log={href: req.url, ipv6: req.ip, date: data , date_strint:`${data}`, req:req.header, res: res}
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


// app.get('/ab?cd', function(req, res) {
//   res.send('ab?cd');
// });
//app.set('view engine', 'pug');

const corsOptions = {
  origin: 'http://10.0.5.190:8000/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(timeout('11s'))
app.use(cors())
app.use(function(req,res,next){
  const regexp_1=/cesium_test\/Test/
  if (regexp_1.test(req.url)){
    loger(req,res);
  }
  next()
})
app.use(express.static(__dirname + '/public'));
app.use('/module',express.static(__dirname + '/node_modules/cesium'));
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
app.get('/test/creatProject',(req,res)=>{
  res.sendFile(`./skript/creatProject.html`,optionsPath);
  loger(req,res)
})
app.post('/test/creatProject',urlencodedParser, async (req,res)=>{
  if(!req.body) return res.sendStatus(400);
  console.log(0, req.params),
  console.log(0, req.body),
  console.log(0, req.query),
  creaetProject(req.body.path).then(ev=>{res.send(`папки созданы ${ev}`);console.log(ev)})
  //console.log(1, res),
  //res.sendFile(`./skript/creatProject.html`,optionsPath);
  res.send(`папки созданы`);
})
app.get('/dima', abcd)
app.get('/testing',function(req,res){
  res.sendFile(`./skript/cesium_test/geodata/geojson/react/VDC_3857.geojson`,optionsPath);
  loger(req,res)
})

app.get('/skript/fetchPKK_1/',function(req,res) {
  res.sendFile(`./skript/fetchPKK_1.html`,optionsPath);
  loger(req,res)
})
app.get('/skript/fetchPKK_10/',function(req,res) {
  res.sendFile(`./skript/fetchPKK_10.html`,optionsPath);
  loger(req,res)
})
app.get('/skript/domrf/',function(req,res) {
  res.sendFile(`./skript/homerf.html`,optionsPath);
  loger(req,res)
})
// Нужно сохранять позицию и посылать ее вместе с запросом, затем прехватывать ее и фиксировать (Lon,Lat,H)
app.get('./cesium_test/Test_1.html',function(req,res) {
  res.sendFile('./cesium_test/Test_0.html',optionsPath);
  loger(req,res)
})
app.get('/creaet_project',function(req,res){
  res.sendFile('skript\\js\\creaet_project.js',optionsPath)
})
//app.get('/creaet_zu_point_test',function(req,res){res.s}

app.get('/creat_zu_point',async function(req,res, next){
  const bodys={ user: 'server' }
  bodys.status='work'
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  try{
    await zu_point().then(ev=>{bodys.path=ev});
    bodys.status='complit'
  }catch{
    bodys.status='err'
  }
  //next();
  res.end(JSON.stringify(bodys, null, "\t"))
  console.log(JSON.stringify(bodys, null, "\t"))
  console.log(req.ip)
  //req.end()
})
app.get('/creat_red_line_point',async function(req,res, next){
  const bodys={ user: 'server' }
  bodys.status='work'
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  try{
    await redLine().then(ev=>{bodys.path=ev});
    bodys.status='complit'
  }catch{
    bodys.status='err'
  }
  //next();
  res.end(JSON.stringify(bodys, null, "\t"))
  console.log(JSON.stringify(bodys, null, "\t"))
  console.log(req.ip)
  //req.end()
})
app.get('/workList',async function(req,res, next){
  const bodys={ user: 'server' }
  bodys.status='work'
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  try{
    console.log('work') 
    console.log(req.params.path) 
    await joinSplitZU().then(ev=>{bodys.path=ev});
    bodys.status='complit'
    console.log('complit')
  }catch{
    console.log('err')
    bodys.status='err'
  }
  //next();
  res.end(JSON.stringify(bodys, null, "\t"))
  console.log(JSON.stringify(bodys, null, "\t"))
  console.log(req.ip)
  //req.end()
})
/* app.get('/module',function(req,res){
  res.use('./node_modules/cesium/Build/Cesium')
  console.dir(req)
  console.dir(res)
}) */
//setInterval(updatebd,36e5)
//updatebd();

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