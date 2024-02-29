//import Cesium from 'cesium'
import {Transforms, Cartesian3,Matrix4, Matrix3} from 'cesium'
import gdal from 'gdal-async'
import fs from 'fs'
import path from 'path'

const url_path='C:/Users/ddemidyuk/Documents/WORK/script/education/skript/cesium_test/geodata/testModel/geojson/3DfloorsOKSgltf.geojson'
const url_path2='C:/Users/ddemidyuk/Documents/WORK/script/education/skript/cesium_test/geodata/testModel/geojson/3DfloorsOKSgltf2.geojson'
export default async function createMatrix(url, url2){
    const dataset = gdal.open(url, "r+")
    //const dataset_new = gdal.open(url2, "w","GeoJSON" )
    
    const layer = dataset.layers.get(0)
    //dataset_new.layers.create('test2',layer.srs, gdal.Point)
    const srs_layer=layer.srs
    console.log(layer.name)
    
    //gdal.Driver.copyFiles(url,url2)
    //console.log(dataset_new.layers.get(0))
    console.dir(layer.fields)
    
    //console.dir(layer2.features.first().fid)
   
        layer.fields.add(new gdal.FieldDefn('Matrix', gdal.OFTString))
        const layer_test = layer.features.map((elem, index)=>{
            //console.log(elem)
            
            //console.log(1, elem.fields.toObject())
            //console.log(elem.getGeometry().x)
            //console.log(elem.getGeometry().y)
            const modelMatrix = Transforms.eastNorthUpToFixedFrame(
                Cartesian3.fromDegrees(elem.getGeometry().x,elem.getGeometry().y, 0)
            );
            let matrix4Out = undefined
            
            if (!!modelMatrix){
                matrix4Out = [
                    modelMatrix["0"],
                    modelMatrix["1"],
                    modelMatrix["2"],
                    modelMatrix["3"],
                    modelMatrix["4"],
                    modelMatrix["5"],
                    modelMatrix["6"],
                    modelMatrix["7"],
                    modelMatrix["8"],
                    modelMatrix["9"],
                    modelMatrix["10"],
                    modelMatrix["11"],
                    modelMatrix["12"],
                    modelMatrix["13"],
                    modelMatrix["14"],
                    modelMatrix["15"],
                ]
                //console.dir(matrix4Out.toString())
                // if (index===88){
                //     let matrix3 = Matrix4.getMatrix3(modelMatrix, new Matrix3())
                //     let rotation =Matrix3.getRotation(matrix3, new Matrix3())
                //     console.dir(rotation)
                //     let scale =Matrix3.getScale(matrix3, new Cartesian3())
                //     console.dir(scale)
                // }
            }
            //elem.fields.set('CHARCTR',modelMatrix["1"])
            elem.fields.set('Matrix',matrix4Out.toString())
            //console.log( elem.fid, elem.fields.toObject())
            //layer.features.add(elem)
            //elem.fields.forEach((elem)=>{console.log(elem)})
            return elem
    
        })
        //console.dir(layer_test[86].fields.toObject())
        layer_test.forEach((elem,index)=>{
            layer.features.remove(index)
            layer.features.add(elem)
            //console.dir(elem.fields.toObject())
        })
        //console.dir(layer.features.get(88).fields.toObject())
        //layer.flush()
        //dataset.layers.copy(layer_test, 'test_3')
        //layer_test.flush()
        //dataset.flush()
        //console.dir(layer_test.features.first().fid)
        //const layer2 = dataset_new.layers.copy(layer, 'test')
        //console.log(layer2.features.first())
            //dataset_new.close()
            //console.log(1000000)
            dataset.close()
            //dataset_new.close()
    
    
    

}
createMatrix(url_path,url_path2)