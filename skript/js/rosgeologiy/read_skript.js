import fs from 'fs';
import path from 'path';
import gdal from 'gdal-async';

//функция обработки градусов
function calcToDec(str){
    //console.log(str)
    let grad=parseFloat(str.match(/^\d{1,3}/)[0])
    let min=parseFloat(str.match(/\d{1,2}(?=')/)[0])
    let sec=parseFloat(str.match(/(\d{1,2}\.\d{1,})|(\d{1,2})(?=")/)[0])
    //console.log(grad,min,sec)
    //console.log(grad+min/60+sec/3600)
    return grad+min/60+sec/3600
}
//функция создания точки
function createPoligon(arr){
    let endList=[]
    arr.forEach((ev, index)=>{
        endList[index]=[]
        let elem=ev.split(/\s{1,}/)
        //console.log(elem)
        //endList[index][0]= parseFloat(elem[0])
        endList[index][1]= calcToDec(elem[1])
        endList[index][0]= calcToDec(elem[2])
        //console.log(endList[index])
    })
   
    if (endList[0][0]==endList[endList.length-1][0]
        &&
        endList[0][1]==endList[endList.length-1][1]){
        console.log('JR')
    }else{
        endList.push(endList[0])
        //console.log (arr)
    }
    //console.log(endList)
    return [endList.reverse()]
}



//import input_data from './dagestan.json' assert {type: 'json'}; Неработает
let input_data = JSON.parse( fs.readFileSync('./dagestan.json')).result.data

//регулярки
const regexpCoordSys=/(?<=(Система координат - ))\S{0,50}/;
const regexpType=/(?<=(Тип пространственного объекта - ))\S{0,50}/g;

let output_data=[]
let output_data_point=[]
let output_data_line=[]
let output_data_poligon=[]
let output_data_NaN=[]
let output_data_tible=[]


console.log(Object.keys( input_data))
console.log(input_data.totals)
Object.keys( input_data).forEach(ev=>{
    console.log(ev, input_data[ev].length)
})

for (let i=0;i<input_data.rows.length;i++){
    //output_data[i]={}
    let odject_data_set={}
    odject_data_set.uid=i
    input_data.cols.forEach((ev,num)=>{
        //console.log(i)
        if (num!=8){
            odject_data_set[ev[0]]=input_data.values[num][i]
        }else{
            //console.log(i, input_data.values[num][i])
            odject_data_set[ev[0]]=input_data.values[num][i]
            
        }
        //console.log(num,ev[0])
        //odject_data_set[ev[0]]=input_data.values[num][i]

    })
    let selectColon=odject_data_set[input_data.cols[8][0]]
    if(selectColon === null ){
        output_data_tible.push(odject_data_set)
    }else{
        //console.log(regexpCoordSys.lastIndex)
        //switch()

        console.log(i, selectColon.match(regexpType) )
        if ( selectColon.match(regexpType)===null){

            console.log(i,selectColon)
            


  /*           if (selectColon.match(regexpType).length>1){
                //console.log(i,selectColon)
            }else{
                console.log(i,selectColon)
            } */
            //console.log(i,regexpCoordSys.test(selectColon))
            
        }else{

        }
        //regexpCoordSys.lastIndex=0
    }
    output_data[i]=odject_data_set
    //odject_data_set

}
let maxi=0
output_data_tible.forEach((ev, index)=>(
    maxi=Math.max(index,maxi)
))
console.log(output_data_tible[maxi])
/* input_data.cols.forEach((ev,num)=>{
    output_data[index][ev[0]]
    console.log(ev[0])
})

input_data.values.forEach((item, index)=>{
    //console.log(Array.isArray(ev))
    output_data[index]={}
    input_data.cols.forEach((ev,num)=>{
        output_data[index][ev[0]]=
        console.log(ev[0])
    })
    console.log(item[0])
    //Array.prototype.at
}) */

//console.log(output_data[0])
//console.log(input_data.cols)
/* input_data.cols.forEach(ev=>{
    console.log(ev[0])
}) */