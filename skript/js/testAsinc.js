console.log('a')
let v
async function abc(){
    setTimeout(()=>{
        console.log('aaaa')
    },5000)
    return true
}

async function abcd(){
    v = abc().then(()=>{
        console.log(v)
    })
    
    await setTimeout(()=>{
        if (v===true){
            console.log('not')
        }
    },3000)
    console.log(v)
}
abcd()