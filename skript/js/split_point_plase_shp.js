import XLSX from 'xlsx';
import fs from 'fs'
import path from 'path'
import gdal from 'gdal-async'
let event1='start'
console.time(event1)
//программа берет данные (точки) сохраненные qgis и записывает новый файл для КРАСНЫХ ЛИНИЙ С НЕПРЕРЫВНОЙ НУМЕРАЦИЕЙ
//const input_filegeometry = "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\plant_point_20230606.gpkg";
const input_filegeometry = "C:\\Users\\ddemidyuk\\Desktop\\20230620\\plant_20230620_0.gpkg"; 
//const output_path = "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\Red_Line_point_20230510_4.xlsx"; 
const output_xlsx="plant_20230620_new.xlsx";
const output_newlaer="plant_20230620_new"
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
console.timeLog(event1)
layer.features.forEach((ev, index)=>{
    agrigetObj[index]=JSON.parse(ev.fields.toJSON())
    //console.log(ev)
    agrigetObj[index].fid=ev.fid
    agrigetObj[index].x= Math.round (ev.getGeometry().x*100)/100
    agrigetObj[index].y= Math.round (ev.getGeometry().y*100)/100
    //console.log(agrigetObj[index].old_numZU)
    maxim=Math.max(maxim,agrigetObj[index].old_numZU)
    miniim=Math.min(miniim,agrigetObj[index].old_numZU)
})
console.log(agrigetObj.length)
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
console.timeLog(event1)
for (let i =miniim; i<=maxim;i++){
    list_line=agrigetObj.filter(ev=>ev['old_numZU']==i)
    console.log(i,  list_line.length)
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
            }else{
                let d_y=((0.35*0.1)**2)*((list_line[index+1].y-list_line[index-1].y)**2)
                let d_x=((0.35*0.1)**2)*((list_line[index+1].x-list_line[index-1].x)**2)
                errorpoligon+=(d_y+d_x)
            }
            result[q]={
                nid: ev.fid,
                "Номер точки": ev.vertex_part_index+j,
                "Номер контура": ev.old_numZU,
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
            result[q]={
                nid: ev.old_numZU,
                "Номер точки": ev.vertex_part_index+j,
                "Номер контура": ev.vertex_index,
                "Номер точки в контуре": ev.vertex_part_index,
                x: ev.x,
                y: ev.y,
                typeGeometry:'L',
                error_point: 0.1
            }
            q++
        })
        j+=list_line.length
    }
    
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
console.timeLog(event1)
const worksheet = XLSX.utils.json_to_sheet(result);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "plant_20230620_new");
XLSX.writeFile(workbook, dir_input+"\\"+output_xlsx, { compression: true });

//запись в новый файл
//gdal.Driver.create(dir_input+"\\"+output_newlaer)
const dataset_new = gdal.open(dir_input+"\\"+output_newlaer,"w","GPKG")

//const dataset_new = gdal.Driver.create(dir_input+"\\"+output_newlaer, "GPKG")
const create_layers=dataset_new.layers.create('plant_20230620_new', srs_layer, gdal.Point);
const layer_new = dataset_new.layers.get(0)

//console.dir(Object.getPrototypeOf(layer_new.features), {showHidden: true})
//console.dir(layer_new.features)
//console.dir(layer_new.fields)
console.dir(Math.sqrt( errorpoligon))
console.log('start createLayers')
console.timeLog(event1)
layer_new.fields.add(new gdal.FieldDefn('ID', gdal.OFTInteger));
layer_new.fields.add(new gdal.FieldDefn('Номер точки', gdal.OFTInteger));
layer_new.fields.add(new gdal.FieldDefn('Номер контура', gdal.OFTInteger));
layer_new.fields.add(new gdal.FieldDefn('Номер точки в контуре', gdal.OFTInteger));
layer_new.fields.add(new gdal.FieldDefn('x', gdal.OFTReal));
layer_new.fields.add(new gdal.FieldDefn('y', gdal.OFTReal));
layer_new.fields.add(new gdal.FieldDefn('typeGeometry', gdal.OFTString));

//console.log(Object.keys(result[0]))
console.time('ev')
result.forEach(ev=>{
    let feature = new gdal.Feature(layer_new)
    feature.fields.set('ID', ev.nid);
    feature.fields.set('Номер точки', ev['Номер точки']);
    feature.fields.set('Номер контура', ev['Номер контура']);
    feature.fields.set('Номер точки в контуре', ev['Номер точки в контуре']);
    feature.fields.set('x', ev.x);
    feature.fields.set('y', ev.y);
    feature.fields.set('typeGeometry', ev.typeGeometry);
    feature.setGeometry(new gdal.Point(ev.x, ev.y));
    layer_new.features.add(feature);
})
console.log('end')
console.timeLog(event1)
//gdal.drivers.forEach(function(drive,i){
//    console.log(drive.description);
//})