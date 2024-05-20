import fs from 'fs';

//import projectDirectoriesJSON from './schemProjekt.json';
//базовый каталок
//ПЕРЕПИСАТЬ НА отностительные пути C:\Users\ddemidyuk\Documents\WORK\Project\Хантамансийск
//const baseFolder = 'O:\\Градостроительство\\2023\\ВЕДУЧИ';
const baseFolder = 'C:/Users/ddemidyuk/Documents/temp/123';
//const projectDirectories =  fs.readFileSync('./schemProjekt.json', 'utf8');
//const projectDirectories =  fs.readFileSync('C:\\Users\\ddemidyuk\\Documents\\WORK\\script\\education\\skript\\js\\schemProjekt.json', 'utf8');
const projectDirectories =  fs.readFileSync('./skript/js/schemProjekt.json', 'utf8');
//console.dir(projectDirectories)
const projectDirectoriesJSON =  JSON.parse(projectDirectories);
//console.log(projectDirectoriesJSON)

//const projectDirectories2 = JSONstr(projectDirectoriesJSON)
//console.log(projectDirectories2)
//описание каталогов проекта
export default async function creaetProject (baseFolder){
//console.log(2, projectDirectoriesJSON)
const projectDirectories =  fs.readFileSync('./skript/js/schemProjekt.json', 'utf8');
//console.dir(projectDirectories)
const projectDirectoriesJSON =  JSON.parse(projectDirectories);
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
    // array.forEach(elem=>{
    //     createDirect(baseFolder+"\\", elem.directories).then(ev=>{
    //         resList[i]=ev
    //         console.log(i)
    //         console.log(resList[i])
    //         i++
    //     })
    //     console.log(typeof elem.substructs)
    //     if (elem.substructs != null){
    //         readTree(baseFolder+"\\"+elem.directories, elem.substructs)
    //     }else{
    //         console.log("предел глубины") 
    //     }
    // })
    return new Promise((res,rej)=>{
        array.forEach(elem=>{
            createDirect(baseFolder+"\\", elem.directories).then(ev=>{
                resList[i]=ev
                //console.log(i)
                //console.log(resList[i])
                res(resList)
                i++
            })
            //console.log(typeof elem.substructs)
            if (elem.substructs != null){
                readTree(baseFolder+"\\"+elem.directories, elem.substructs)
                    .then(
                        (elem)=>{console.log(2, elem)}
                    )
            }else{
                console.log("предел глубины") 
            }
        })
        console.log(10, resList)
        //res(resList)
    })
}
readTree(baseFolder, projectDirectoriesJSON).then((elem)=>{console.log(1, elem)})
/* for (let vule of projectDirectories){
    createDirect(baseFolder, vule.directories).then(ev=>{
        resList[i]=ev
        console.log(resList)
        i++
    })
} */

console.log(resList)
return new Promise((resolve, reject)=>{resList})
}
//creaetProject(baseFolder).then(ev=>{console.log(ev)})