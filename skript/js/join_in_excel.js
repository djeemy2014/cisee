import XLSX from 'xlsx';
import fs from 'fs'
import path from 'path'

export default async function joinSplitZU (){

const url_input = "O:\\Градостроительство\\2023\\ВДЦ ДАГЕСТАН\\11_GeoData\\3_vector\\Межевание\\Итоговый вариант\\"
const input_xlsx_path = url_input+"Этапы.xlsx";

const input_xlsx = "./skript/js/temp_file/Этапы.xlsx"
await fs.promises.copyFile(input_xlsx_path, input_xlsx)

//чтение файла
const file = XLSX.readFile(input_xlsx);
console.log(file.SheetNames)
//
const list_1 = XLSX.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]]);

const list_2 = XLSX.utils.sheet_to_json(
    file.Sheets[file.SheetNames[1]]);
//console.log(list_2)
const list_2_filt=list_2.filter(ev=>typeof ev['Условный номер образуемого земельного участка']=="string")
//let consoles=[]
list_2_filt.forEach((itim2, index2)=>{
    list_1.forEach((itim1, index1)=>{
        if (index1==4&&itim1["Куда? (Служебное поле)"]==itim2['Условный номер образуемого земельного участка']){
            console.log(itim1['Вид разрешенного использования'], itim2['Вид разрешенного использования'])
        }
        if (/(\.)/.test(itim1['Условный номер образуемого земельного участка'])){
            if (/(\:)/.test(itim1['__EMPTY'])){
                //console.log(0,Object.keys(itim1)[6])
                //console.log(0,itim1['__EMPTY'])
                itim1['Возможные способы образования земельных участков']='Раздел'
                
            }else{
                //console.log(index1,/(\.)/.test(itim1['Условный номер образуемого земельного участка']))
                itim1['Возможные способы образования земельных участков']='Образование из земель (земельных участков) государственной и муниципальной собственности'
            }
        }else{
            itim1['Возможные способы образования земельных участков']=itim1['Возможные способы образования земельных участков']
        }
        
        if (itim1["Куда? (Служебное поле)"]==itim2['Условный номер образуемого земельного участка']){
            itim1["Куда? (Служебное поле)"]==itim2['Условный номер образуемого земельного участка']
            itim1['Вид разрешенного использования']=itim2['Вид разрешенного использования']
            itim1['Наименование объектов капитального строительства']=itim2['Наименование объектов капитального строительства']
            itim1['Этап строительства (по 2 этапу)']=itim2['Этапы строительства']
            //console.log(itim1['Вид разрешенного использования'], itim2['Вид разрешенного использования'])
        }
        if (index1==4&&itim1["Куда? (Служебное поле)"]==itim2['Условный номер образуемого земельного участка']){console.log(itim1['Вид разрешенного использования'], itim2['Вид разрешенного использования'])}
    })
})


list_2_filt.forEach((evl1,index)=>{
    console.log(evl1['Условный номер образуемого земельного участка'])
    let area =0
    let list_ZU=[]
    let list_1_ZU=list_1.filter(ev=>ev["Куда? (Служебное поле)"]==evl1['Условный номер образуемого земельного участка'])
    list_1_ZU.forEach(itim=>{
        list_ZU.push(itim['Условный номер образуемого земельного участка'])
        itim['Вид разрешенного использования']=evl1['Вид разрешенного использования']
        itim['Наименование объектов капитального строительства']=evl1['Наименование объектов капитального строительства']
        area+=parseInt(itim['Площадь, кв.м'],10)
    })
    
/*     list_1.forEach((itim2, index)=>{
        if (evl1["Куда? (Служебное поле)"]==itim2['Условный номер образуемого земельного участка']){
            evl1["Куда? (Служебное поле)"]==itim2['Условный номер образуемого земельного участка']
            itim2['Вид разрешенного использования']=evl1['Вид разрешенного использования']
            itim2['Наименование объектов капитального строительства']=evl1['Наименование объектов капитального строительства']
        }
    }) */
    evl1['__EMPTY']=list_ZU.toString().replace(/,/g, '; ')
    evl1['Контроль площади (служебная)']=area
    evl1['Сколько участков']=list_ZU.length
    if (list_ZU.length==1){
        evl1['Возможные способы образования земельных участков']='Перераспределение'
    }else{
        evl1['Возможные способы образования земельных участков']='Объединение'
    }

})
console.log(list_1[4]['Вид разрешенного использования'], list_1[4]["Куда? (Служебное поле)"])
const worksheet = XLSX.utils.json_to_sheet(list_2_filt);
XLSX.utils.book_append_sheet(file, worksheet, "2 этап_js");
const worksheet_2 = XLSX.utils.json_to_sheet(list_1);
XLSX.utils.book_append_sheet(file, worksheet_2, "1 этап_js")
console.log(file.SheetNames)
XLSX.writeFile(file, "./skript/js/temp_file/"+"Этапы_js.xlsx", { compression: true });

await fs.promises.copyFile('./skript/js/temp_file/Этапы_js.xlsx', url_input+"Этапы_js.xlsx")
await fs.promises.rm('./skript/js/temp_file/Этапы_js.xlsx')
await fs.promises.rm('./skript/js/temp_file/Этапы.xlsx')
return ([url_input+"Этапы_js.xlsx"])
}