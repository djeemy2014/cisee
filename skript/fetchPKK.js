import csv from 'csvtojson';
import csvWriter from 'csv-writer';
import fs from 'fs';
import fetch from 'node-fetch';

//let input_csv = "C:\\Users\\ddemidyuk\\Downloads\\Чернушинский го.csv"
//let output_csv = "C:\\Users\\ddemidyuk\\Downloads\\Чернушинский го_2.csv"
const date = new Date()
console.log('x-t',`${date.getDate()}/Fab/${date.getFullYear()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()+date.getMilliseconds()/1000}S`)



let i=0;

const listing = [
    '48:03-6.628',
    '48:03-6.862',
    '48:03-6.1398',
    '48:03-6.1296',
    ]
let outputData = []
async function fetching (list){
//let url =`https://pkk.rosreestr.ru/api/features/10/${list}}`
let url = `https://dom.gosuslugi.ru/homemanagement/api/rest/services/houses/public/1/7475c118-6ed0-43ac-a2c9-44fd6db4764c`
//let url =`https://jsonplaceholder.typicode.com/posts/${list}`
let encoded = encodeURI(url);
console.log(encoded)



await fetch(encoded,
    {
        "method": "GET",
        "transformRequest": [
          null
        ],
        "transformResponse": [
          null
        ],
        "jsonpCallbackParam": "callback",
        "url": encoded,
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*",
           // "access-control-allow-origin": "*"
        },
        "data": "",
        "timeout": {}
    }

    )
    .then((resp) => {
        console.log(resp.status)
        resp.json().then(json => {
            console.log(i)
            outputData[i]=json
            i++
        //console.log(JSON.stringify(json))
    })
})
    .catch((err)=>{
        console.log("ОЙ, Error", err)
/*         console.log (i++)
        if (i<=10){
            fetching()
            console.log (i)
        } */
    })
}

//import fetch from 'node-fetch';

//const response = await fetch('https://httpbin.org/status/301', { redirect: 'manual' });
//console.log(response.status)
/* listing.forEach((list) =>{
    fetching(list)
}) */
setTimeout(() => console.log (outputData), 5000)
//await fetching(list)
fetching (1)

