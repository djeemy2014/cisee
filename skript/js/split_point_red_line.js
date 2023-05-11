import XLSX from 'xlsx';
import fs from 'fs'
import gdal from 'gdal-async'
//программа берет данные сохраненные qgis и записывает новый файл для КРАСНЫХ ЛИНИЙ С НЕПРЕРЫВНОЙ НУМЕРАЦИЕЙ
const input_xlsx = "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\Red_Line_point_20230510.xlsx";
const output_path = "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\Red_Line_point_20230510_2.xlsx"; //Чернушенский Соликамский ALL20230313

const file = XLSX.readFile(input_xlsx)
const list = XLSX.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]]);
let list_line=[];
let result=[];
let j=1;
const line_vertex_par = list.reduce((x, y) => Math.max(x, y))
//console.log(line_vertex_par)
for (let i =0; i<=32;i++){
    list_line=list.filter(ev=>ev['vertex_par']==i)
    //console.log(i, list_line.length)
    //console.log(i, list_line[0].x, list_line[0].y,list_line[list_line.length-1].x, list_line[list_line.length-1].y)
    if (list_line[0].x==list_line[list_line.length-1].x&&list_line[0].y==list_line[list_line.length-1].y){
        list_line[list_line.length-1].vertex_p_1=0;
        list_line.forEach((ev, index)=>{
            ev.id=ev.vertex_p_1+j
            ev.z='G';
        })
        j+=list_line.length-1
        //console.log(i, list_line[0].x, list_line[0].y,list_line[list_line.length-1].x, list_line[list_line.length-1].y)
    }else{
        list_line.forEach((ev, index)=>{
            ev.id=ev.vertex_p_1+j
            ev.z='L'
        })
        j+=list_line.length
    }
    result=result.concat(list_line)
}

console.log(result)
//list.forEach(ev=>{
//    if (ev['vertex_par']==0){
//        console.log(ev)
//    }
//    })
const worksheet = XLSX.utils.json_to_sheet(result);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Red_Line_point_20230510");
XLSX.writeFile(workbook, output_path, { compression: true });