import fs from 'fs';
//import projectDirectoriesJSON from './skript/js/pathList.json'
//базовый каталок
const baseFolder = '//nas.ggp.local\\Public\\FS\\Градостроительство\\2022\\СТП Липецкой области';
const url01 = '\\09_GeoData\\2_doc';
//const projectDirectories2 = JSONstr(projectDirectoriesJSON)
//console.log(projectDirectories2)
//описание каталогов проекта
const projectDirectories = [
    {
        "directories": '\\09_GeoData\\1_doc',
        "description": 'Документы необходимые для проекта',
    },
    {
        "directories": '\\09_GeoData\\2_tabl',
        "description": 'Таблицы проекта',
    },
    {
        "directories": '\\09_GeoData\\3_vector',
        "description": 'Векторные данные проекта',
    },
    {
        "directories": '\\09_GeoData\\4_dxf',
        "description": 'Векторные в формате DXF ',
    },
    {
        "directories": '\\09_GeoData\\5_rastr',
        "description": 'Растровые данные необходимые для проекта',
    },
    {

        "directories": '\\09_GeoData\\6_dem',
        "description": 'Рельеф необходимый для проекта',
    },
    {
        "directories": '\\09_GeoData\\7_map',
        "description": 'Экспортируемые карты проекта',
    },
    {
        "directories": '\\09_GeoData\\8_style',
        "description": 'Стили проекта',
    },
    {
        "directories": '\\09_GeoData\\9_CRS',
        "description": 'Система координат проекта',
    },
];

async function createDirect(baseFolder, url){
try {
    const createDir = await fs.promises.mkdir(baseFolder+url, { recursive: true });
    console.log(`Каталок создан! ${createDir}`);
  } catch (err) {
    console.log("Ошибка")
    console.error(err.message);
  }
};
const listDirectories = []
for (let vule of projectDirectories){
    createDirect(baseFolder, vule.directories)
}