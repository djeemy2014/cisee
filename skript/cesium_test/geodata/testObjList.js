import XLSX from 'xlsx'
import {objToList, listToObj} from './objList.js'
import fs from 'fs'

const url = 'C:/Users/ddemidyuk/Documents/WORK/script/education/skript/cesium_test/geodata/testModel/geojson/testingListScen.xlsx'
const url2 = 'C:/Users/ddemidyuk/Documents/WORK/script/education/skript/cesium_test/geodata/testModel/geojson/testingListScen.csv'
const url3 = 'C:/Users/ddemidyuk/Documents/WORK/script/education/skript/cesium_test/geodata/testModel/geojson/testingListScen2.csv'
const file = XLSX.readFile(url2)
const listFile = XLSX.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]]
    );
function fileToList(listFile){
let leble1,leble2
let k=0
for (const elem of listFile){
    switch(elem.typecode){
        case 201:
            switch(k){
                case 1:
                    elem['classname']=leble1
                    break;
                case 2:
                    elem['classname']=leble1
                    elem['subclassname']=leble2
                    break;
                default:

                    break;
            }
            break;
        case 110:
            if (k===0){
                leble1=elem.name
                k++
                //console.log(elem);
            }else{
                leble2=elem.name
                k++
            }
            //console.log('class');
            break;
        case 111:
            if (k!=0){
                leble1=undefined
                k--
            }else{
                leble2=undefined
                k--
            }
            //console.log('endclass');
            break;
        default:
            console.log(elem);
            break;

    }
}
return listFile.filter(elem=>elem.typecode!=110&&elem.typecode!=111)
}
//console.log(fileToList(listFile))

let arr = listToObj(fileToList(listFile))
console.log( JSON.stringify(arr, null, '\t') )
//console.log( listToObj(listFile.filter(elem=>elem.typecode===201)) )