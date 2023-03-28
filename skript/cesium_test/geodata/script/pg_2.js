//import { string } from "yargs";

//function DBselect(){
  const { Client } = require('pg');

  const client = new Client({
      user: 'dda',
      password: 'dda',
      host: '192.168.0.64',
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
  
  client.query('SELECT "json" from public."json_layer";', (err, res) => {
      if (err) throw err
      //response.status(200).json(res.rows[0].json)
      console.log(res.rows[0].json)
      //document.body.innerHTML ="<h1>"+res.rows[0].json+"</h1>"
      client.end()
  })
  console.log('Connect');
 // }
 //DBselect()
//export default DBselect();
//const d = DBselect();
//console.log(string(d));
//document.body.innerHTML ="<h1>Результат скрипта: "+d+"</h1>"