//импорт библеотеки

//import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
//import GeoTIFF, {fromFile} from "geotiff";
const GeoTIFF = require("geotiff");
const { fromFile } = GeoTIFF;
//import { geoKeys } from 'geotiff/dist-node/globals';

//подключение ссылки на файл
const urs= 'C:/Users/ddemidyuk/Documents/WORK/TEMP/geotiff/DEM_03_3857.tiff'
console.log('GeoTIFF')

//fromUrl(someUrl)
//  .then(tiff => {urs});


(async function() {
  const tiff =  await fromFile(urs, console.log('загрузка') )
//   const tiff = await fromUrl(someUrl);
    // ...
    
 

/*
const input = document.getElementById('file'):
  input.onchange = async function() {
    const tiff = await fromBlob(input.files[0]);
  }

*/

//const tiff =  await fromFile(urs, console.log('загрузка') )
const image = await tiff.getImage();
const width = image.getWidth();
const height = image.getHeight();
const tileWidth = image.getTileWidth();
const tileHeight = image.getTileHeight();
const samplesPerPixel = image.getSamplesPerPixel();
const resolution = image.getResolution();
const bbox = image.getBoundingBox();
const geod = image.geoKeys;
const img = image.readRGB();
const red = await image.readRasters();
//const image = await tiff.getImage(imput);

//const i = tiff.getBoundingBox()


//используя локальный ArrayBuffer
/*
const response = await fetch(someUrl);
const arrayBuffer = await response.arrayBuffer();
const tiff = await fromArrayBuffer(arrayBuffer);
*/
//по умолчанию читается первое изображение.
//const image = await tiff.getImage(urs);

var count = 0;
for (var key in geod) {
    console.log(key);
    count++;
}
sessionStorage.setItem('key', height);

console.log(count);

console.log(width, height, tileWidth, tileHeight, samplesPerPixel, resolution);
console.log(image);
console.log(red);

})();
