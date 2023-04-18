//console.log(document.head)

const head=document.querySelector('head')
const headPut=[];
//вставка титула
const title=document.createElement('title')
const titleText=document.createTextNode(`Cisee`)
title.appendChild(titleText)
headPut.push(title.outerHTML)

//вставка иконки
const icon=document.createElement('link')
icon.rel='icon';
icon.href='/img/121591_5.svg'
headPut.push(icon.outerHTML)
//вставка стиля
const baseStyle=document.createElement('link')
baseStyle.rel='stylesheet';
baseStyle.href='/css/base.css';
baseStyle.type='text/css';
headPut.push(baseStyle.outerHTML)
//console.dir(headPut)


headPut.forEach(ev=>{
    head.innerHTML+=ev
})
/* head.innerHTML+=title.outerHTML
head.innerHTML+=icon.outerHTML
head.innerHTML+=baseStyle.outerHTML
 */


