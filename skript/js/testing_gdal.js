// скрипт для тестирования gdal

import fs from 'fs'
import path from 'path'
import gdal from 'gdal-async'

const input_filegeometry = "C:\\Users\\ddemidyuk\\Documents\\WORK\\Lipeck\\20230313 Материалы для оценки\\SHP\\FunctionalZone.shp";
const output_newlaer="FunctionalZone_JSON"
const dir_input=path.dirname(input_filegeometry)
console.log(dir_input)
console.log(path.basename(input_filegeometry))
const dataset = gdal.open(dir_input+"\\"+path.basename(input_filegeometry))
const layer = dataset.layers.get(0)
const srs_layer=layer.srs

//const dataset_new = gdal.open(dir_input+"\\"+output_newlaer,"w","GeoJSON")

//const create_layers=dataset_new.create(output_newlaer, srs_layer, gdal.Polygon);
//const layer_new = dataset_new.layers
//const create_layers_2=dataset_new.copy(layer,0);

//let feature = new gdal.Feature(layer_new)
let feature = layer.features

console.dir(layer.features.first().getGeometry())
console.log(layer.fields.getNames())
console.dir(layer.features.first().fields)


layer.features.forEach((ev, index)=>{
    //layer_new.features[index]=ev
    //JSON.parse(ev.fields.toJSON())
    //console.log(ev)
})


/* layer.fields.getNames().forEach(ev=>{
    layer_new.fields.add(new gdal.FieldDefn(ev,gdal.OFTString));
}) */
//console.dir(gdal.DatasetLayers)

//layer_new.features.add(feature);

