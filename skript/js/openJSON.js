import gdal from 'gdal-async'
//import JSONic from 'C:\\Users\\ddemidyuk\\Documents\\WORK\\script\\education\\skript\\js\\pathList.json'

//const file = JSON.parse(JSONic)

//console.log(file)
gdal.drivers.forEach(function(drive,i){
    console.log(drive.description);
})