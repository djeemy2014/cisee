import fs from 'fs'
import fetch from 'node-fetch';
import xlsx from 'xlsx'



async function getFileRfgf(){
const url ='https://rfgf.ru/catalog/temp_files/opendata/license/opendata.csv//'
const metod_respons = {
    method: 'GET'
}
const response = await fetch(url,metod_respons)
if (response.status==200){
    const body= await response.text()
    //console.log(body)
    //fs.writeFileSync('./rfgf.csv',body,(err)=>{console.log('Ошибка записи!', err)})
}

}

getFileRfgf()