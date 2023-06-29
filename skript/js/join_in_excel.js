import XLSX from 'xlsx';
import fs from 'fs'
import path from 'path'


const input_xlsx = "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\Межевание\\20230620\\Этапы.xlsx";

//чтение файла
const file = XLSX.readFile(input_xlsx);
console.log(file.SheetNames)
//
const list_1 = XLSX.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]]);

const list_2 = XLSX.utils.sheet_to_json(
    file.Sheets[file.SheetNames[1]]);

const list_2_filt=list_2.filter(ev=>typeof ev['Условный номер образуемого земельного участка']=="string")

list_2_filt.forEach((evl1,index)=>{
    console.log(evl1['Условный номер образуемого земельного участка'])
    let area =0
    let list_ZU=[]
    let list_1_ZU=list_1.filter(ev=>ev["Куда? (Служебное поле)"]==evl1['Условный номер образуемого земельного участка'])
    list_1_ZU.forEach(itim=>{
        list_ZU.push(itim['Условный номер образуемого земельного участка'])
        area+=parseInt(itim['Площадь, кв.м'],10)
    })
    evl1['__EMPTY']=list_ZU.toString().replace(',', '; ')
    evl1['Контроль площади (служебная)']=area
    evl1['Сколько участков']=list_ZU.length

})

const worksheet = XLSX.utils.json_to_sheet(list_2_filt);
XLSX.utils.book_append_sheet(file, worksheet, "2 этап_js");
console.log(file.SheetNames)
XLSX.writeFile(file, "O:\\Градостроительство\\2022\\ОЭЗ ТРК Каспийский прибрежный кластер\\09_GeoData\\3_vector\\Межевание\\20230620\\"+"Этапы_js.xlsx", { compression: true });