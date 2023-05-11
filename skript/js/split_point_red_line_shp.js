import XLSX from 'xlsx';
import fs from 'fs'
import path from 'path'
import gdal from 'gdal-async'
//программа берет данные (точки) сохраненные qgis и записывает новый файл для КРАСНЫХ ЛИНИЙ С НЕПРЕРЫВНОЙ НУМЕРАЦИЕЙ
const input_filegeometry = "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\Red_Line_point_20230510_4.gpkg";
const output_path = "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\Red_Line_point_20230510_4.xlsx"; 
const output_xlsx="Red_Line_point_20230510_4.xlsx";
const output_newlaer="Red_Line_point_20230510_4_new.gpkg"
let agrigetObj=[];
let list_line=[];
let result=[];
let j=1;
let q=0;
let maxim=0;
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
layer.features.forEach((ev, index)=>{
    agrigetObj[index]=JSON.parse(ev.fields.toJSON())
    //console.log(agrigetObj[index])
    agrigetObj[index].x= Math.round (ev.getGeometry().x*100)/100
    agrigetObj[index].y= Math.round (ev.getGeometry().y*100)/100
    maxim=Math.max(maxim,agrigetObj[index].vertex_part)
})
//console.log(agrigetObj)
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
for (let i =0; i<=maxim;i++){
    list_line=agrigetObj.filter(ev=>ev['vertex_part']==i)
    //console.log(i, list_line.length)
    //console.log(i, list_line[0].x, list_line[0].y,list_line[list_line.length-1].x, list_line[list_line.length-1].y)
    if (list_line[0].x==list_line[list_line.length-1].x&&list_line[0].y==list_line[list_line.length-1].y){
        list_line[list_line.length-1].vertex_part_index=0;
        list_line.forEach((ev, index)=>{
            result[q]={
                fid: ev.vertex_index,
                "Номер точки": ev.vertex_part_index+j,
                "Номер контура": ev.vertex_part,
                "Номер точки в контуре": ev.vertex_part_index,
                x: ev.x,
                y: ev.y,
                typeGeometry:'G'
            } 
            q++
        })

        j+=list_line.length-1
        //console.log(i, list_line[0].x, list_line[0].y,list_line[list_line.length-1].x, list_line[list_line.length-1].y)
    }else{
        list_line.forEach((ev, index)=>{
            result[q]={
                fid: ev.vertex_index,
                "Номер точки": ev.vertex_part_index+j,
                "Номер контура": ev.vertex_part,
                "Номер точки в контуре": ev.vertex_part_index,
                x: ev.x,
                y: ev.y,
                typeGeometry:'L'
            }
            q++
        })
        j+=list_line.length
    }
    
    //result=result.concat(list_line)
}

//console.log(result)
//list.forEach(ev=>{
//    if (ev['vertex_par']==0){
//        console.log(ev)
//    }
//    })

//dataset.close()
//запись в XLSX
const worksheet = XLSX.utils.json_to_sheet(result);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Red_Line_point_20230510");
XLSX.writeFile(workbook, dir_input+"\\"+output_xlsx, { compression: true });

//запись в новый файл
//gdal.Driver.create(dir_input+"\\"+output_newlaer)
const dataset_new = gdal.open(dir_input+"\\"+output_newlaer,"w","GPKG")

//const dataset_new = gdal.Driver.create(dir_input+"\\"+output_newlaer, "GPKG")
const create_layers=dataset_new.layers.create('Red_Line_point_20230510_new', srs_layer, gdal.Point);
const layer_new = dataset_new.layers.get(0)

console.dir(Object.getPrototypeOf(layer_new.features), {showHidden: true})
console.dir(layer_new.features)

//console.log(Object.keys(result[0]))
result.forEach(ev=>{
    
    //console.log(ev)
})

//gdal.drivers.forEach(function(drive,i){
//    console.log(drive.description);
//})