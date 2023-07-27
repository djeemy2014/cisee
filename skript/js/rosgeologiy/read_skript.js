import fs from 'fs';
import path from 'path';
import gdal from 'gdal-async';



//import input_data from './dagestan.json' assert {type: 'json'}; Неработает
let input_data = JSON.parse( fs.readFileSync('./dagestan.json')).result.data
const output_point='./output_point.geojson'
const output_line='./output_line.geojson'
const output_poligon='./output_poligon.geojson'
const output_collection='./output_collection.geojson'
const output_NaN='./output_NaN.geojson'
const output_tible='./output_tible.geojson'

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
        //console.log(elem)
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
        if (ev[0][1]==ev[ev.length-1][1]
            &&
            ev[0][2]==ev[ev.length-1][2]){
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

        //тут нужно разбирать и сортировать

        let result=selectColon.match(regexpTable)
        if ( selectColon.match(regexpType)===null){
            odject_data_set.type='NaN'
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
                        odject_data_set.geometyArray=createPoint(odject_data_set[input_data.cols[8][0]].match(regexpTable))
                        output_data_point.push(odject_data_set)
                        break
                    };
                    case 'Линия':{
                        odject_data_set.type='line'
                        odject_data_set.crs=selectColon.match(regexpCoordSys)
                        odject_data_set.geometyArray=createLine(odject_data_set[input_data.cols[8][0]].match(regexpTable))
                        output_data_line.push(odject_data_set)
                        break
                    };
                    case 'Полигон':{
                        odject_data_set.type='poligon'
                        odject_data_set.crs=selectColon.match(regexpCoordSys)
                        odject_data_set.geometyArray=createPoligon(odject_data_set[input_data.cols[8][0]].match(regexpTable))
                        
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
            } 
        }
    }
    output_data[i]=odject_data_set

}
let maxi=0
output_data_tible.forEach((ev, index)=>(
    maxi=Math.max(index,maxi)
))




//Тестовые вызовы!
console.log('point', output_data_point.length)
console.log('line', output_data_line.length)
console.log('poligon', output_data_poligon.length)
console.log('collection', output_data_collection.length)
console.log('NaN', output_data_NaN.length)
console.log('tible', output_data_tible.length)
let test_odj=output_data_line[0]
let test_list=test_odj['Географические координаты угловых точек участка недр, верхняя и нижняя границы участка недр']
console.log(test_odj.uid)
console.log(test_odj)
console.log(test_odj.geometyArray)
console.log(test_list)
//test_list.geometyArray.forEach(ev=>{console.log(ev)})
console.dir(output_data_point[0].geometyArray)
console.dir(output_data_line[0].geometyArray)
console.dir(output_data_poligon[0].geometyArray)
//Вывод ключей объектов
//console.log(Object.keys(test_odj))

//создание слоя
//тестовый слой
function writeFileGEOPiont(input_list){
const dataset_point = gdal.open(output_point,"w","GeoJSON")

dataset_point.layers.create('point', null, gdal.Point);
let layer_point = dataset_point.layers.get(0)

Object.keys(input_list[0]).forEach(ev=>{
    //console.log(ev, typeof input_list[0][ev])
    switch(typeof input_list[0][ev]){
        case 'number' :{
            layer_point.fields.add(new gdal.FieldDefn(ev,  gdal.OFTInteger))
            break
        };
        case 'string' :{
            layer_point.fields.add(new gdal.FieldDefn(ev,  gdal.OFTString))
            break
        };
        case 'object' :{
            layer_point.fields.add(new gdal.FieldDefn(ev,  gdal.OFTString))
            break
        };
        default:{

            layer_point.fields.add(new gdal.FieldDefn(ev,  gdal.OFTString))
        }
    }
})
input_list.forEach(ev=>{
    ev.geometyArray
    //console.log(ev.geometyArray)
    let x = ev.geometyArray[0][1]
    let y = ev.geometyArray[0][2]
    let feature = new gdal.Feature(layer_point)
    Object.keys(ev).forEach(key=>{
        //console.log(ev[key])
        //console.log(key)
        switch(typeof ev[key]){
            case 'number' :{
                feature.fields.set(key, ev[key])
                break
            };
            case 'string' :{
                feature.fields.set(key, ev[key])
                break
            };
            case 'object' :{
                if (ev[key]== null){
                    feature.fields.set(key, null)
                    break
                }
                //console.log(1, key, ev[key])
                feature.fields.set(key, ev[key].toString())
                break
            };
            default:{
                feature.fields.set(key, ev[key])
            }
        }
        
    })
    
    feature.setGeometry(new gdal.Point(x, y));
    layer_point.features.add(feature);

})
}



//функция для линий
function writeFileGEOLine(input_list){
    const datasett = gdal.open(output_line,"w","GeoJSON")

    dataset.layers.create('line', null, gdal.Point);
    let layer = dataset.layers.get(0)

    Object.keys(input_list[0]).forEach(ev=>{
        //console.log(ev, typeof input_list[0][ev])
        switch(typeof input_list[0][ev]){
            case 'number' :{
                layer.fields.add(new gdal.FieldDefn(ev,  gdal.OFTInteger))
                break
            };
            case 'string' :{
                layer.fields.add(new gdal.FieldDefn(ev,  gdal.OFTString))
                break
            };
            case 'object' :{
                layer.fields.add(new gdal.FieldDefn(ev,  gdal.OFTString))
                break
            };
            default:{
    
                layer.fields.add(new gdal.FieldDefn(ev,  gdal.OFTString))
            }
        }
    })
    input_list.forEach(ev=>{
        ev.geometyArray
        //console.log(ev.geometyArray)
        let x = ev.geometyArray[0][1]
        let y = ev.geometyArray[0][2]
        let feature = new gdal.Feature(layer)
        Object.keys(ev).forEach(key=>{
            //console.log(ev[key])
            //console.log(key)
            switch(typeof ev[key]){
                case 'number' :{
                    feature.fields.set(key, ev[key])
                    break
                };
                case 'string' :{
                    feature.fields.set(key, ev[key])
                    break
                };
                case 'object' :{
                    if (ev[key]== null){
                        feature.fields.set(key, null)
                        break
                    }
                    //console.log(1, key, ev[key])
                    feature.fields.set(key, ev[key].toString())
                    break
                };
                default:{
                    feature.fields.set(key, ev[key])
                }
            }
            
        })
        
        feature.setGeometry(new gdal.Point(x, y));
        layer.features.add(feature);
    
    })
    }




writeFileGEOPiont(output_data_point)
writeFileGEOLine(output_data_line)
//console.log(JSON.stringify(test_list))
//console.log(test_list.match(regexpTable))
//console.log(createPoint(test_list.match(regexpTable)))
//console.log(createLine(test_list.match(regexpTable)))
//console.log(createPoligon(test_list.match(regexpTable)))

//gdal.drivers.forEach(function(drive,i){
//    console.log(drive.description);
//})


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