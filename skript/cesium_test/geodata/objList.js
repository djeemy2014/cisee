

export function listToObj (arr, i=0,lvl='classname', output=[]){
    const listClassName = arr.map(ev=>ev[lvl]).filter((x,i,a)=>a.indexOf(x)===i)
    //console.log(listClassName)
    listClassName.forEach((className)=>{ 
        
        if (className===undefined||className===''){
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

export function objToList(arr,i=0,lvl='',name='', output=[]){
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
//let a = listToObj(obj1.list)
// console.log(JSON.stringify( a, null, "\t"))
// console.log(0,objToList(a))
//console.log(JSON.stringify( listToObj(array), null, "\t"))