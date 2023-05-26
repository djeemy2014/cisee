import fs from 'fs';
import path from 'path';
import gdal from 'gdal-async';



//import input_data from './dagestan.json' assert {type: 'json'}; Неработает
let input_data = JSON.parse( fs.readFileSync('./dagestan.json')).result.data

//регулярки
const regexpCoordSys=/(?<=(Система координат - ))\S{0,50}/g;
const regexpType=/(?<=(Тип пространственного объекта - ))\S{0,50}/g;
//const regexpString=/\d{1,3}.{30,50}([E]|[Е])$/
const regexpString=/(?<=\n)\d{1,3}.{30,50}(([E](\s){0,8})|([Е](\s){0,8}))/g
//const regexpTable=/((?<=\n)\d{1,3}(\s).{8,12}°.{20,40}(([E](\s){0,10}\r\n)|([Е](\s){0,10}\r\n))){1,100}/g;
const regexpTable=/((?<=\n)\d{1,3}(\s).{30,50}(([E](\s){0,15})|([Е](\s){0,15}))){1,100}/g;

let output_data=[]
let output_data_point=[]
let output_data_line=[]
let output_data_poligon=[]
let output_data_collection=[]
let output_data_NaN=[]
let output_data_tible=[]


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
//функция создания точек
function createPoint(arr){
    let endList=[]
    arr.forEach((ev, index)=>{
        endList[index]=[]
        let elem=ev.split(/\s{1,}/)
        //console.log(elem)
        endList[index][0]= parseFloat(elem[0])
        endList[index][2]= calcToDec(elem[1])
        endList[index][1]= calcToDec(elem[2])
        //console.log(endList[index])
    })
    //console.log(endList)
    return endList
}
//функция создания линии
function createLine(arr){
    let endList=[]
    arr.forEach((ev, index)=>{
        endList[index]=[]
        let elem=ev.split(/\s{1,}\r\n/)
        console.log(elem)
        elem.forEach((item,num)=>{
            if (item!=''){
                endList[index][num]=createPoint([item])[0]
            }

            /* let elem=item.split(/\s{1,}/)
            console.log(elem)
            endList[index][0]= index
            endList[index][1]= parseFloat(elem[0])
            endList[index][3]= calcToDec(elem[1])
            endList[index][2]= calcToDec(elem[2]) */

            /* console.log(endList[index]) */
        })
        
    })
    //console.log(endList)
    return endList
}

//функция создания полигона!!!!!
function createPoligon(arr){
    let endList=createLine(arr)
    endList.forEach((ev, index)=>{
        if (ev[0][1]==ev[endList.length-1][1]
            &&
            ev[0][2]==ev[endList.length-1][2]){
            console.log('JR')
        }else{
            ev.push(ev[0])
            //console.log (arr)
        }
    })
    
    //console.log(endList)
    return endList
}
//функция для коллекций


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
            odject_data_set[ev[0]]=input_data.values[num][i]
        }
    })
    let selectColon=odject_data_set[input_data.cols[8][0]]
    if(selectColon === null ){
        //выбраковка пустых ячеек
        odject_data_set.type='null'
        output_data_tible.push(odject_data_set)
    }else{
        //console.log(regexpCoordSys.lastIndex)
        //switch()

        //тут нужно разбирать и сортировать

        let result=selectColon.match(regexpTable)
        //console.log(i,Array.isArray( result))
        //console.log(i,result.length)
        /*if (result.length!=selectColon.match(regexpType).length){

            console.log(selectColon.match(regexpType))
            console.log(selectColon.match(regexpTable))
            //console.log(selectColon.match(regexpString))
            //console.log(result)
            //console.log(JSON.stringify( selectColon))
            console.log((selectColon))
        }
         if (selectColon.match(regexpType).length>1){
            //console.log(regexpTable.exec(selectColon))
           
            //console.log(i,result.length)
            console.log(i,Array.isArray( result))
            //console.log(result)
        } */
        if ( selectColon.match(regexpType)===null){
            odject_data_set.type='NaN'
            //odject_data_set.type='collection'
            odject_data_set.crs=selectColon.match(regexpCoordSys)
            odject_data_set.geometyArray=[]
            output_data_NaN.push(odject_data_set)
            
        }else{
            if (selectColon.match(regexpType).length>1){
                odject_data_set.type='collection'
                odject_data_set.crs=selectColon.match(regexpCoordSys)
                odject_data_set.geometyArray=[]
                output_data_collection.push(odject_data_set)
            }else{
                switch(selectColon.match(regexpType)[0]){
                    case 'Мультиточка':{
                        odject_data_set.type='point'
                        odject_data_set.crs=selectColon.match(regexpCoordSys)
                        odject_data_set.geometyArray=[]
                        output_data_point.push(odject_data_set)
                        break
                    };
                    case 'Линия':{
                        console.log(selectColon.match(regexpType))
                        console.log(selectColon.match(regexpType)[0])
                        odject_data_set.type='line'
                        odject_data_set.crs=selectColon.match(regexpCoordSys)
                        odject_data_set.geometyArray=[]
                        output_data_line.push(odject_data_set)
                        break
                    };
                    case 'Полигон':{
                        odject_data_set.type='poligon'
                        odject_data_set.geometyArray=[]
                        odject_data_set.crs=selectColon.match(regexpCoordSys)
                        output_data_poligon.push(odject_data_set)
                        break
                    };
                    default:{
                        odject_data_set.type='collection'
                        odject_data_set.geometyArray=[]
                        odject_data_set.crs=selectColon.match(regexpCoordSys)
                        output_data_collection.push(odject_data_set)
                    }
                }
                //console.log(selectColon.match(regexpType).length)
            }
            //console.log(i, selectColon.match(regexpType) )   
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
console.log(0, output_data_point.length)
console.log(1, output_data_line.length)
console.log(2, output_data_poligon.length)
console.log(3, output_data_collection.length)
console.log(4, output_data_NaN.length)
console.log(5, output_data_tible.length)
let test_odj=output_data_collection[0]
let test_list=test_odj['Географические координаты угловых точек участка недр, верхняя и нижняя границы участка недр']
console.log(test_odj.uid)
console.log(test_odj)
console.log(test_list)
console.log(JSON.stringify(test_list))
console.log(test_list.match(regexpTable))
//console.log(createPoint(test_list.match(regexpTable)))
console.log(createLine(test_list.match(regexpTable)))
//console.log(createPoligon(test_list.match(regexpTable)))

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