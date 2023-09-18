//создание geotiff-tile
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob, fromFile }  from 'geotiff'
import fs from 'fs'
import path from 'path'
import  geotiffTile from "geotiff-tile";
import gdal from 'gdal-async'

const input_file='./skript/cesium_test/geodata/testModel/dem/ALPSMLC30_N042E048_DSM.tif'
const input_file2='http://10.0.5.190:18077/cesium_test/geodata/testModel/dem/ALPSMLC30_N042E048_DSM.tif'
const input_file3='C:/Users/ddemidyuk/Documents/WORK/script/education/skript/cesium_test/geodata/testModel/dem/ALPSMLC30_N042E048_DSM.tif'
const input_file4='./skript/cesium_test/geodata/testModel/dem/tt.txt'
const output_path='C:/Users/ddemidyuk/Documents/WORK/script/education/skript/cesium_test/geodata/testModel/dem/tile'


/* fetch(input_file4)
.then((res) => res.text())
.then(console.dir) */
//получение данных
const tiff = await fromFile(input_file)
const image = await tiff.getImage();
//const bbox = image.getBoundingBox();
console.log(image)
console.dir(image.getResolution())
console.dir(image.getBoundingBox())
/* fromBlob(input_file3)
    .then((file)=>{console.log(file)})
    //.then((tiff)=>{console.log(2,fromArrayBuffer(tiff))})
 */
/* const response = await fromFile(input_file3);
const arrayBuffer = await response.arrayBuffer();
const tiff = await fromArrayBuffer(arrayBuffer);
console.log(tiff) */

//создание тайлов
//console.dir(geotiffTile())
geotiffTile.createTile({
    // bounding box of tile in format [xmin, ymin, xmax, ymax]
  bbox: bbox,

  // spatial reference system of the bounding box
  // as a EPSG Code number
  bbox_srs : 4326,

  // geometry to clip by in GeoJSON format
  cutline: geojson,

  // spatial reference system of cutline
  cutline_srs: 4326,

  // set to higher number to increase logging
  debug_level : 2,

  // how many points to add to each side of the bounding box if reprojecting
  // optional, default is 100
  density : 100,

  // instance of geotiff.js
  tiff,

  // function that accepts a pixel array of values of type
  // ({ pixel }: { pixel: number[] }) => number[]
  //expr,;

  // layout using xdim layout syntax
  // https://github.com/danieljdufour/xdim
  layout : "[band][row,column]",

  // resampling method
  method: "near",

  // round pixel values to integers
  //round,

  // optional
  // override default nested tile array types
  //tile_array_types: ["Array", "Uint8ClampedArray"],

  // optional
  // if tile_array_types is not specified, choose
  // the strategy for deciding which type of arrays
  // auto - safest and default option, only uses typed array if it's sure there won't be any clamping
  // geotiff - use the same array types that geotiff.js uses (good if not stretching min or max)
  // untyped - use only untyped arrays
  // undefined - same as auto
  //tile_array_types_strategy: "untyped",

  // projection of the tile
  // as an EPSG code
  tile_srs: 4326,

  // tile height in pixel
  tile_height: 512,

  // width of tile in pixels
  tile_width: 512,

  // resolution of the tile
  // from 0 (lowest) to 1 (highest)
  tile_resolution: 0.5,

  // whether to use overviews if available
  //use_overview,;

  // optional, default is false
  // enable experimental turbocharging via proj-turbo
  //turbo: false
})
