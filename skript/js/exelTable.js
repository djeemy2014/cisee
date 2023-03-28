import fs from 'fs';
import exceljs from 'exceljs'

let urlFile = "C:/Users/ddemidyuk/Downloads/2_5386803709843873915 (2).xlsx"
const inputFile = new exceljs.Workbook()
//workbook.xlsx.readFile(urlFile)
async function a1 (urlFile){
    await inputFile.xlsx.readFile(urlFile)
    //console.log(1, inputFile)
}
a1(urlFile)
    .then(()=>{
        //console.log(2, inputFile._worksheets);
        const worksheet = inputFile.getWorksheet("ГНП");
        //console.log(worksheet.tables);
        //console.log(worksheet.getTables("Таблица2")[0].table);
        console.log(worksheet.getColumn(1).values);

    })
//console.log(inputFile.xlsx)
//.then(console.log(2, inputFile))
//console.log(2, inputFile)
