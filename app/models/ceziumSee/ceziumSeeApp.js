import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const app=express()
function ab (){
    console.log(1+2)
    return 1+2
}

    // app.get('/ab?cd', function(req, res) {
    //     res.send('ab?cd');
    //   })
  const  abcd =  function(req, res) {
        console.log('doma')
        res.send('dima');
      }
    
export {abcd}
