import fs from 'fs';

//import projectDirectoriesJSON from './schemProjekt.json';
//базовый каталок
//ПЕРЕПИСАТЬ НА отностительные пути
const baseFolder = 'C:\\Users\\ddemidyuk\\Documents\\WORK\\test_schem';
//const projectDirectories =  fs.readFileSync('./schemProjekt.json', 'utf8');
//const projectDirectories =  fs.readFileSync('C:\\Users\\ddemidyuk\\Documents\\WORK\\script\\education\\skript\\js\\schemProjekt.json', 'utf8');
const projectDirectories =  fs.readFileSync('./skript/js/schemProjekt.json', 'utf8');
//console.dir(projectDirectories)
const projectDirectoriesJSON =  JSON.parse(projectDirectories);
//console.log(projectDirectoriesJSON)

//const projectDirectories2 = JSONstr(projectDirectoriesJSON)
//console.log(projectDirectories2)
//описание каталогов проекта
export async function creaetProject (baseFolder, projectDirectoriesJSON){
//console.log(2, projectDirectoriesJSON)
const projectDirectories = [
    {
        "directories": '09_GeoData',
        "description": 'Основной католог',
        "substructs": [

        {
            "directories": '0_tmp',
            "description": 'Временные данные',
            "substructs": null,
        },
        {
            "directories": '1_doc',
            "description": 'Документы необходимые для проекта',
            "substructs": null,
        },
        {
            "directories": '2_tabl',
            "description": 'Таблицы проекта',
            "substructs": null,
        },
        {
            "directories": '3_vector',
            "description": 'Векторные данные проекта',
            "substructs": [
                {
                    "directories": 'KPT',
                    "description": 'Векторные данные KPT',
                    "substructs": null,
                },
                {
                    "directories": 'tmp',
                    "description": 'Временные данные',
                    "substructs": null,
                },
                {
                    "directories": 'OSM',
                    "description": 'Векторные данные OSM',
                    "substructs": null,
                },
                ],
        },
        {
            "directories": '4_dxf',
            "description": 'Векторные в формате DXF ',
            "substructs": null,
        },
        {
            "directories": '5_rastr',
            "description": 'Растровые данные необходимые для проекта',
            "substructs": null,
        },
        {

            "directories": '6_dem',
            "description": 'Рельеф необходимый для проекта',
            "substructs": null,
        },
        {
            "directories": '7_map',
            "description": 'Экспортируемые карты проекта',
            "substructs": null,
        },
        {
            "directories": '8_style',
            "description": 'Стили проекта',
            "substructs": null,
        },
        {
            "directories": '9_CRS',
            "description": 'Система координат проекта',
            "substructs": null,
        },
        ]    
    }];

let resList=[], i=0

async function createDirect(baseFolder, url){

try {
    const createDir = await fs.promises.mkdir(baseFolder+url, { recursive: true });
    //console.log(`Каталок создан! ${createDir}`);
    //console.log(baseFolder+url)
    if (createDir!=undefined){
        return await `Каталок создан! ${createDir}`
    }else{
        throw new Error('Ошибка!')
    }
    
  } catch (err) {
    //console.log(`${err} Каталок ${baseFolder+url} существует!`)
    console.error(err.message);
    return await `${err} Каталок ${baseFolder+url} существует!`
  }
};

async function readTree(baseFolder, array){
    //console.log(array)
    array.forEach(elem=>{
        createDirect(baseFolder+"\\", elem.directories).then(ev=>{
            resList[i]=ev
            //console.log(resList)
            console.log(resList[i])
            i++
        })
        console.log(typeof elem.substructs)
        if (elem.substructs != null){
            readTree(baseFolder+"\\"+elem.directories, elem.substructs)
        }else{
            console.log("предел глубины") 
        }
    
    })

}
readTree(baseFolder, projectDirectoriesJSON)
/* for (let vule of projectDirectories){
    createDirect(baseFolder, vule.directories).then(ev=>{
        resList[i]=ev
        console.log(resList)
        i++
    })
} */
//console.log(await resList)
return new Promise(res=>{resList})
}
creaetProject(baseFolder, projectDirectoriesJSON).then(ev=>{console.log(ev)})