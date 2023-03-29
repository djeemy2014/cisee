import XLSX from 'xlsx';

const input_xlsx = "C:\\Users\\ddemidyuk\\Downloads\\статистика по ГП и ТЗ на 27.03.23.xlsx";
const output_xlsx = "C:\\Users\\ddemidyuk\\Downloads\\ALL20230329.xlsx"; //Чернушенский Соликамский ALL20230313
const selectColon = 'Реестровый номер';
const kodTZColon = 'Наименование';
const selectNumKK=/59:40.|59:25.|59:10.|59:34./;
const regexpKodTZ=/\(\S{0,6}( \(\S{0,3}\)){0,1}\)/;
//const regexpNP=/(,\s)\S{0,50}(.\s){0,1}\S{0,50}(\s){0,1}\S{0,50}(,\s)\S{0,50}( городской округ)/
const regexpNP=/(,\s)\S{0,50}(\.)\s{0,1}\S{0,50}(\s){0,1}\S{0,50}(,\s)|\S{0,50}( городской округ)/;
const regexpMO=/\S{0,50}( городской округ)/;


let inputDatd =[];
let select=[];
//чтение файла
const file = XLSX.readFile(input_xlsx);
//читаем листы
const sheets = file.SheetNames;
//console.log(sheets)

/* 
//цикл чтения листов
for(let i = 0; i < sheets.length; i++)
//бежит по листам
{
    //переводит лист в JSON
   const temp = XLSX.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
    //бежит по массиву и пишет все строки в выходной массив
    //console.log(res)
        inputDatd.push(res)
   })
}
console.log(inputDatd[0])
 */

//Лист территориальных зон
const listTZ = XLSX.utils.sheet_to_json(
    file.Sheets[file.SheetNames[1]]);

//console.log(listTZ)

//выборка по условию
listTZ.forEach((res) => {
    //
    if (selectNumKK.test(res[selectColon])){
        //console.log(res)
        inputDatd.push(res);
    };

});
console.log(inputDatd)
inputDatd.forEach((res) => {
    //console.log(res[kodTZColon]);
    //console.log(regexpKodTZ.exec(res[kodTZColon])[0].replace(/\(|\)/g,''))
    //console.log(regexpMO.exec(res[kodTZColon]))
    //console.log(regexpNP.exec(res[kodTZColon])[0].replace(/, |,/g,''))
    res['Муницыпалитет']=regexpMO.exec(res[kodTZColon])[0];
    res['Населенный пункт']=regexpNP.exec(res[kodTZColon])[0].replace(/, |,/g,'');
    res['Код Территориальной зоны']=regexpKodTZ.exec(res[kodTZColon])[0].replace(/\(|\)/g,'');

})
//console.log(inputDatd);
const worksheet = XLSX.utils.json_to_sheet(inputDatd);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "ТЗ");
XLSX.writeFile(workbook, output_xlsx, { compression: true });
