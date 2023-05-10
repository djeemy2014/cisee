import XLSX from 'xlsx';
import fs from 'fs'

const input_xlsx = "C:\\Users\\Администратор\\Desktop\\полезные ископаемые\\Плоская таблица (2).xlsx";
const output_path = "C:\\Users\\Администратор\\Desktop\\"; //Чернушенский Соликамский ALL20230313
const regexpCoordSys=/Система координат - \S{0,50}/g;
const regexpType=/Тип пространственного объекта - \S{0,50}/g;
//const regexpType=new RegExp('Тип пространственного объекта - \S{0,50}','g');
//const regexpTable=/№ точки .{0,100}(.{0,100}(\r\n)){3,}/g;
const regexpTable=/(\d.{0,200}((Е|E)\s{0,}\n)){3,}/g;
const nameOutputFile='testing_JS_2'

const geojson={
    "type": "FeatureCollection",
    "name": nameOutputFile,
    "features": []
}


let inputDatd =[];
let select=[];
//чтение файла
const file = XLSX.readFile(input_xlsx);

const list = XLSX.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]]);

//console.log(list[0]['Географические координаты угловых точек участка недр, верхняя и нижняя границы участка недр'])
function calcToDec(str){
    //console.log(str)
    let grad=parseFloat(str.match(/^\d{1,3}/)[0])
    let min=parseFloat(str.match(/\d{1,2}(?=')/)[0])
    let sec=parseFloat(str.match(/(\d{1,2}\.\d{1,})|(\d{1,2})(?=")/)[0])
    //console.log(grad,min,sec)
    //console.log(grad+min/60+sec/3600)
    return grad+min/60+sec/3600
}


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
//createPoligon(arrrrrr)
//выборка по условию
console.log(list.length)
list.forEach((res, index) => {
    
    let selectColon=res['Географические координаты угловых точек участка недр, верхняя и нижняя границы участка недр']
    //
    console.log(index)
    //console.log(selectColon)
    if (regexpCoordSys.test(selectColon)&&regexpTable.test(selectColon)){
        console.log(selectColon)
        let arrCoordSys=selectColon.match(regexpCoordSys)
        let arrType=selectColon.match(regexpType)
        let arrTable=selectColon.match(regexpTable)
        console.dir(arrTable)
        let mPlogon=[]
        arrTable.forEach((ev, index)=>{
            let list =ev.split('\r\n')
            //list.shift()
            list.pop()
            //console.log(list)
            //console.log(createPoligon(list))
            mPlogon[index]=createPoligon(list)
        })
        //console.log(index, mPlogon)
        res.FID=index;
        res.typeGeom=arrType;
        res.typeCoordSys=arrCoordSys;
        geojson.features[index]={
            "type": "Feature",
            "geometry":{ 
                type: "MultiPolygon", 
                coordinates:mPlogon
            },
            "properties":res
           
        }
        //console.log(index, mPlogon)
        //inputDatd.push(res);
    }else{
        console.dir('NO')
        console.log(selectColon)
    };
    regexpCoordSys.lastIndex=0

});
console.log(JSON.stringify(geojson))
let data=JSON.stringify(geojson, null, 2)
let url=output_path+nameOutputFile+'.geojson'
fs.writeFile(url,data, 'utf8', err=>{console.log(err)})
