import XLSX from 'xlsx';
import fs from 'fs'
import path from 'path'
import gdal from 'gdal-async'

export default async function zu_point (){
let event1='start'
//console.time(event1)
//программа берет данные (точки) сохраненные qgis и записывает новый файл для КРАСНЫХ ЛИНИЙ С НЕПРЕРЫВНОЙ НУМЕРАЦИЕЙ
//const input_filegeometry = "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\plant_point_20230606.gpkg";
//const url_input = "C:\\Users\\ddemidyuk\\Desktop\\20230811\\"
const url_input = "O:\\Градостроительство\\2023\\ВДЦ ДАГЕСТАН\\11_GeoData\\3_vector\\Межевание\\Итоговый вариант\\"
const input_file = "ZU_point.gpkg"

//await fs.promises.copyFile(url_input+input_file, 'C:/Users/ddemidyuk/Documents/WORK/script/education/skript/js/temp_file/ZU_point.gpkg')
console.log('Copy?')
await fs.promises.copyFile(url_input+input_file, './skript/js/temp_file/ZU_point.gpkg').then(console.log).catch(console.log)
console.log('Copy!')
//copyFile_gpkg(url_input, input_file, './temp_file/ZU_point.gpkg')
const input_filegeometry = './skript/js/temp_file/ZU_point.gpkg'; //'C:/Users/ddemidyuk/Documents/WORK/script/education/skript/js/temp_file/ZU_point.gpkg'
//const output_path = "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\Red_Line_point_20230510_4.xlsx"; 
const output_xlsx="ZU_point_new.xlsx";
const output_newlaer="ZU_point_new"
let agrigetObj=[];
let list_line=[];
let result=[];
let errorpoligon=0
let j=1;
let q=0;
let maxim=0, miniim=10;

const dir_input=path.dirname(input_filegeometry)
console.log(dir_input)
console.log(path.basename(input_filegeometry))
const dataset = gdal.open(dir_input+"\\"+path.basename(input_filegeometry))
//console.log(1,dataset)
const layer = dataset.layers.get(0)
const srs_layer=layer.srs
//console.log(2,gdal.SpatialReference.fromWKT(layer.srs.toWKT()))
//console.dir(Object.getPrototypeOf( layer.srs), {showHidden: true})
//console.log(0,layer.fields.getNames())
//const f_geom =layer.features.first().getGeometry()
//console.log(0,f_geom.x, f_geom.y)
//console.log(0, JSON.parse( layer.features.first().fields.toJSON()))
console.log(0, ( layer.features.first().fid))
//console.log(100, ( layer.features.get(1)))
//console.log(100, ( layer.features.get(2)))
console.log('start work')
//console.timeLog(event1)
layer.features.forEach((ev, index)=>{
    agrigetObj[index]=JSON.parse(ev.fields.toJSON())
    //console.log(ev)
    agrigetObj[index].fid=ev.fid
    agrigetObj[index].y= Math.round (ev.getGeometry().x*100)/100
    agrigetObj[index].x= Math.round (ev.getGeometry().y*100)/100
    //console.log(agrigetObj[index].numb_zu)
    maxim=Math.max(maxim,agrigetObj[index].numb_zu)
    miniim=Math.min(miniim,agrigetObj[index].numb_zu)
})
const listZUFromPoint = agrigetObj.map(ev=>ev.numb_zu).filter((x,i,a)=>a.indexOf(x)===i)
console.log(agrigetObj.length)
console.log(listZUFromPoint)
console.log(listZUFromPoint.length)
console.log(maxim)
console.log(miniim)
//console.log(JSON.stringify(layer.features))
//console.log("fields: " + layer.fields.getNames())
//console.log("srs: " + (layer.srs ? layer.srs.toWKT() : 'null'))



/* 
const file = XLSX.readFile(input_xlsx)
const list = XLSX.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]]);
let list_line=[];
let result=[];
let j=1;
const line_vertex_par = list.reduce((x, y) => Math.max(x, y))
//console.log(line_vertex_par)
*/
console.log('start JSON')
//console.timeLog(event1)

for (const i of listZUFromPoint){
    list_line=agrigetObj.filter(ev=>ev['numb_zu']==i)
    console.log(list_line.length)
    if (list_line.length===0)continue
    //console.log(i,  list_line.length)
    result[q]={nid:0, "Номер контура": list_line[0].numb_zu, "Площадь":list_line[0].area}
    q++
    //console.log(result[q])
    //if (i==128){console.log(i,  agrigetObj)}
    //console.log(i, list_line[0].x, list_line[0].y,list_line[list_line.length-1].x, list_line[list_line.length-1].y)
    if (list_line[0].x==list_line[list_line.length-1].x&&list_line[0].y==list_line[list_line.length-1].y){
        list_line[list_line.length-1].vertex_part_index=0;
        list_line.forEach((ev, index)=>{
            if (index-1<0){
                let d_y=((0.35*0.1)**2)*((list_line[index+1].y-list_line[list_line.length-1].y)**2)
                let d_x=((0.35*0.1)**2)*((list_line[index+1].x-list_line[list_line.length-1].x)**2)
                errorpoligon+=(d_y+d_x)
            }else if(index+1>list_line.length-1){
                let d_y=((0.35*0.1)**2)*((list_line[0].y-list_line[index-1].y)**2)
                let d_x=((0.35*0.1)**2)*((list_line[0].x-list_line[index-1].x)**2)
                errorpoligon+=(d_y+d_x)
                console.log("EEES",d_y,d_x, errorpoligon)
            }else{
                let d_y=((0.35*0.1)**2)*((list_line[index+1].y-list_line[index-1].y)**2)
                let d_x=((0.35*0.1)**2)*((list_line[index+1].x-list_line[index-1].x)**2)
                errorpoligon+=(d_y+d_x)
            }
            
            result[q]={
                nid: ev.fid,
                "Номер точки": ev.vertex_part_index+j,
                "Номер контура": ev.numb_zu,
                "Номер точки в контуре": ev.vertex_part_index+1,
                x: ev.x,
                y: ev.y,
                typeGeometry:'G',
                error_point: 0.1
            } 
            q++

        })

        j+=list_line.length-1
        //console.log(i, list_line[0].x, list_line[0].y,list_line[list_line.length-1].x, list_line[list_line.length-1].y)
    }else{
        list_line.forEach((ev, index)=>{
            //console.log(ev)
            // if (index-1<0){
            //     let d_y=((0.35*0.1)**2)*((list_line[index+1].y-list_line[list_line.length-1].y)**2)
            //     let d_x=((0.35*0.1)**2)*((list_line[index+1].x-list_line[list_line.length-1].x)**2)
            //     errorpoligon+=(d_y+d_x)
            // }else if(index+1>list_line.length-1){
            //     let d_y=((0.35*0.1)**2)*((list_line[0].y-list_line[index-1].y)**2)
            //     let d_x=((0.35*0.1)**2)*((list_line[0].x-list_line[index-1].x)**2)
            //     errorpoligon+=(d_y+d_x)
                
            // }else{
            //     let d_y=((0.35*0.1)**2)*((list_line[index+1].y-list_line[index-1].y)**2)
            //     let d_x=((0.35*0.1)**2)*((list_line[index+1].x-list_line[index-1].x)**2)
            //     errorpoligon+=(d_y+d_x)
            // }
            // console.log("EEES",d_y,d_x, errorpoligon)
            result[q]={
                nid: ev.fid,
                "Номер точки": ev.vertex_part_index+j,
                "Номер контура":  ev.numb_zu,
                "Номер точки в контуре": ev.vertex_part_index+1,
                x: ev.x,
                y: ev.y,
                typeGeometry:'L',
                error_point: 0.1
            }
            q++
        })
        j+=list_line.length
    }
    console.log(101010)
    //result=result.concat(list_line)
}

console.log(result.length)
//list.forEach(ev=>{
//    if (ev['vertex_par']==0){
//        console.log(ev)
//    }
//    })

//dataset.close()
//запись в XLSX
console.log('start writeXLSX')
//console.timeLog(event1)
const worksheet = XLSX.utils.json_to_sheet(result);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "ZU_point_new");
XLSX.writeFile(workbook, dir_input+"\\"+output_xlsx, { compression: true });

//запись в новый файл
//gdal.Driver.create(dir_input+"\\"+output_newlaer)
const dataset_new = gdal.open(dir_input+"\\"+output_newlaer+".gpkg","w","GPKG")

//const dataset_new = gdal.Driver.create(dir_input+"\\"+output_newlaer, "GPKG")
const create_layers=dataset_new.layers.create('ZU_point_new', srs_layer, gdal.Point);
const layer_new = dataset_new.layers.get(0)

//console.dir(Object.getPrototypeOf(layer_new.features), {showHidden: true})
//console.dir(layer_new.features)
//console.dir(layer_new.fields)
console.dir(Math.sqrt( errorpoligon))
console.dir(3.5*0.1*Math.sqrt( 35144))//area
console.log('start createLayers')
//console.timeLog(event1)
layer_new.fields.add(new gdal.FieldDefn('ID', gdal.OFTInteger));
layer_new.fields.add(new gdal.FieldDefn('Номер точки', gdal.OFTInteger));
layer_new.fields.add(new gdal.FieldDefn('Номер контура', gdal.OFTInteger));
layer_new.fields.add(new gdal.FieldDefn('Номер точки в контуре', gdal.OFTInteger));
layer_new.fields.add(new gdal.FieldDefn('x', gdal.OFTReal));
layer_new.fields.add(new gdal.FieldDefn('y', gdal.OFTReal));
layer_new.fields.add(new gdal.FieldDefn('typeGeometry', gdal.OFTString));

//console.log(Object.keys(result[0]))
//console.time('ev')
const resultFilter = result.filter(ev=>ev.nid!=0)
resultFilter.forEach(ev=>{
    let feature = new gdal.Feature(layer_new)
    feature.fields.set('ID', ev.nid);
    feature.fields.set('Номер точки', ev['Номер точки']);
    feature.fields.set('Номер контура', ev['Номер контура']);
    feature.fields.set('Номер точки в контуре', ev['Номер точки в контуре']);
    feature.fields.set('x', ev.x);
    feature.fields.set('y', ev.y);
    feature.fields.set('typeGeometry', ev.typeGeometry);
    feature.setGeometry(new gdal.Point(ev.y, ev.x));
    layer_new.features.add(feature);
})
console.log('end')
dataset.close()
dataset_new.close()
//console.timeLog(event1)
//gdal.drivers.forEach(function(drive,i){
//    console.log(drive.description);
//})

await fs.promises.copyFile('./skript/js/temp_file/ZU_point_new.xlsx', url_input+"ZU_point_new.xlsx")
await fs.promises.copyFile('./skript/js/temp_file/'+"ZU_point_new.gpkg", url_input+"ZU_point_new.gpkg")
//await fs.promises.unlink('./skript/js/temp_file/'+"ZU_point_new.gpkg")
await fs.promises.rm('./skript/js/temp_file/'+"ZU_point.gpkg")
await fs.promises.rm('./skript/js/temp_file/ZU_point_new.xlsx')
await fs.promises.rm('./skript/js/temp_file/'+"ZU_point_new.gpkg")

return ([url_input+"ZU_point_new.xlsx", url_input+"ZU_point_new.gpkg"])
}