
const array=[
    {
        "id":1,
        "uid":"001",
        "type": "layer",
        "name": "testLayer!",
        "path":"/VDC_4326.geojson",
        "defaultChecked": true
    },
    {
        "id":0,
        "uid":"000",
        "type": "class",
        "name": "Тестовый Класс",
        "defaultChecked": true
    },
    {
        "id":2,
        "uid":"002",
        "type": "layer",
        "name": "Дороги",
        "path":"/road_4326.geojson",
        "className":"Тестовый Класс",
        "defaultChecked": false
    },
    {
        "id":3,
        "uid":"003",
        "type": "layer",
        "name": "Здания",
        "path":"/bild_4326.geojson",
        "className":"Тестовый Класс",
        "sudClassName":"Тестовый ПодКласс",
        "defaultChecked": true
    }
    ,
    {
        "id":4,
        "uid":"003",
        "type": "layer",
        "name": "Здания2",
        "path":"/bild_4326.geojson",
        "defaultChecked": true
    }
    ,
    {
        "id":5,
        "uid":"003",
        "type": "layer",
        "name": "Здания3",
        "path":"/bild_4326.geojson",
        "defaultChecked": true
    }
    ,
    {
        "id":5,
        "uid":"003",
        "type": "layer",
        "name": "Здания3",
        "path":"/bild_4326.geojson",
        "defaultChecked": true
    }
]
const obj1 = {
    "uid": 1,
    "type": "scena",
    "name": "testScena",
    "list":[
        {
            "id":1,
            "uid":"001",
            "type": "layer",
            "name": "testLayer!",
            "path":"/VDC_4326.geojson",
            "defaultChecked": true
        },
        /* {
            "id":0,
            "uid":"000",
            "type": "class",
            "name": "Тестовый Класс",
            "defaultChecked": true
        }, */
        {
            "id":2,
            "uid":"002",
            "type": "layer",
            "name": "Дороги",
            "path":"/road_4326.geojson",
            "classname":"Тестовый Класс",
            "defaultChecked": false
        },
        {
            "id":3,
            "uid":"003",
            "type": "layer",
            "name": "Здания",
            "path":"/bild_4326.geojson",
            "classname":"Тестовый Класс",
            "subclassname":"Тестовый ПодКласс",
            "defaultChecked": true
        }
        ,
        {
            "id":4,
            "uid":"004",
            "type": "layer",
            "name": "Здания2",
            "path":"/bild_4326.geojson",
            "defaultChecked": true
        }
        ,
        {
            "id":5,
            "uid":"005",
            "type": "layer",
            "name": "Здания3",
            "path":"/bild_4326.geojson",
            "defaultChecked": true
        }
        ,
        {
            "id":6,
            "uid":"006",
            "type": "layer",
            "name": "Здания3",
            "path":"/bild_4326.geojson",
            "classname":"Тестовый Класс 2",
            "defaultChecked": true
        }
    ]
}


const obj2 = {
    "uid": 1,
    "type": "scena",
    "name": "testScena",
    "list":[
        {
            "id":1,
            "uid":"001",
            "type": "layer",
            "name": "testLayer!",
            "path":"/VDC_4326.geojson",
            "defaultChecked": true
        },
        {
            "type":"class",
            "name":"Тестовый Класс",
            "defaultChecked": true,
            "list":[
                {
                    "id":2,
                    "uid":"002",
                    "type": "layer",
                    "name": "Дороги",
                    "path":"/road_4326.geojson",
                    "defaultChecked": false
                },
                {
                    "type":"subclass",
                    "name":"Тестовый ПодКласс",
                    "defaultChecked": true,
                    "list":[
                        {
                            "id":3,
                            "uid":"003",
                            "type": "layer",
                            "name": "Здания",
                            "path":"/bild_4326.geojson",
                            "defaultChecked": true
                        }
                    ]    
                        
                },
                {
                    "id":6,
                    "uid":"006",
                    "type": "layer",
                    "name": "Здания",
                    "path":"/bild_4326.geojson",
                    "defaultChecked": true
                }
            ]
        },
        {
            "id":4,
            "uid":"004",
            "type": "layer",
            "name": "Здания2",
            "path":"/bild_4326.geojson",
            "defaultChecked": true
        }
        ,
        {
            "id":5,
            "uid":"005",
            "type": "layer",
            "name": "Здания3",
            "path":"/bild_4326.geojson",
            "defaultChecked": true
        }
        ,

    ],
}

const arr = obj1.list
const arr2=[1,1,2,3,6,5,6,6,5,8,12]
const arr3=arr.map(ev=>ev.className)
const arr4=arr.map(ev=>ev.sudClassName)
let arrN=arr.filter((x,i,a)=>a.indexOf(x)===i)
let arrN3=arr3.filter((x,i,a)=>a.indexOf(x)===i)
let arrN4=arr4.filter((x,i,a)=>a.indexOf(x)===i)
let out = arr.filter((ev)=>ev.className===arrN3[0])
/* console.log(arr3)
console.log(arr4)
console.log(arrN3)
console.log(arrN4)
console.log(out) */

function testing(arr, i=0){
    const endObj=[]
    const layerList = arr.filter(ev=>ev.type!="class"||ev.type!="subclass")
    const listClassName = layerList.map(ev=>ev.className).filter((x,i,a)=>a.indexOf(x)===i)
    const listSudClassName = layerList.map(ev=>ev.sudClassName).filter((x,i,a)=>a.indexOf(x)===i)

    listClassName.forEach(elem=>{
        layerList.filter(ev=>ev.className===elem)
        //console.log(layerList.filter(ev=>ev.className===elem))
        

    })


    /* console.log(arr)
    console.log(typeof arr)
    console.log(layerList)
    console.log(arr.constructor===Array)
    console.log(listClassName) */
    return (
        [layerList,listClassName,listSudClassName]
    )
}

function listToObj (arr, i=0,lvl='classname', output=[]){
    const listClassName = arr.map(ev=>ev[lvl]).filter((x,i,a)=>a.indexOf(x)===i)
    //console.log(i,lvl,listClassName)
    listClassName.forEach((className)=>{ 
        if (className===undefined){
            let listUnd=arr.filter(elem=>elem[lvl]===className)
            output.push(...listUnd)
        }else{
            let classIN={
                "type":"sub".repeat(i)+"class",
                "name":className,
                "defaultChecked": true,
            }
            let classik = listToObj(arr.filter(elem=>elem[lvl]===className),i+1,"sub".repeat(i+1)+lvl)
            classIN.list = classik
            output.push(classIN)
        }
    })
    return output


}

function objToList(arr,i=0,lvl='',name='', output=[]){
    //console.log(arr)
    arr.forEach((elem)=>{
        if (elem.type.indexOf('class')===-1){
            if (i===0){
                output.push(elem)
            }else{
                elem["sub".repeat(i-1)+'classname']=name
                output.push(elem)
            }
            
        }else{
            let nextLvl = objToList(elem.list, i+1,"sub".repeat(i+1),elem.name)
            output.push(...nextLvl)
        }
    })
    return output
}
//testing(obj1.list)
let a = listToObj(obj1.list)
console.log(JSON.stringify( a, null, "\t"))
console.log(0,objToList(a))
