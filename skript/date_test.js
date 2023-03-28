const a1 = new Date();
console.log(Date(a1));
a1.setHours(10)
console.log(a1);


a1.setMinutes(10);

console.log(a1);


function intervalUpdateDB() {
    //Обновление базы данных через интервал
    let now = new Date();
    console.log(now);
    let a11 = new Date(now);
    console.log(a11);
    //момент времени
    a11.setHours(10);
    a11.setMinutes(19);
    a11.setSeconds(40);
    a11.setMilliseconds(0);
    let step_m = 1;
    let step = step_m * 60 * 1000;
    setTimeout(() => {
        console.log('первая отработка');
        setInterval(() => {
            console.log('10 отработка');
        }, step);
    }, a11 - now);


    return a11;

}
console.log(intervalUpdateDB());
/* const now = new Date();
const a11 = new Date();
console.log(a11);
a11.setHours(16);
a11.setMinutes(7);
a11.setSeconds(30);
a11.setMilliseconds(0);
console.log(a11);
console.log(now);
console.log(a11 - now);


setTimeout(() => {
    console.log('первая отработка');
    setInterval(() => {
        console.log('10 отработка');
    }, 60000);
}, a11 - now); */