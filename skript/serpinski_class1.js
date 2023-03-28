/* создание многоугольной салфетки серпинского  */
/* Игры Хаоса */
class coordinates {}

class Chaos {
    constructor(x0, y0, R0, n, fi, step0, interatif) {
        x0 = 400;
        y0 = 400;
        R0 = 400;
        n = 6;
        fi = 0;
        step0 = 1 / 2;
    }

    nextXY([x0, y0], [dist, angl]) {
        dx = Math.cos(angl) * dist;
        dy = Math.sin(angl) * dist;
        newx = x0 + dx;
        newy = y0 + dy;
        return [newx, newy];
    }

    distAngl2D([x1, y1], [x2, y2]) {
        dx = x2 - x1;
        dy = y2 - y1;
        dist = Math.sqrt(dx ** 2 + dy ** 2);
        rumb = Math.atan2(dy, dx);
        angl = rumb;
        /* 
        вычисление в случае расчета румба
        console.log(rumb)
            switch (true) {
                case ((dx < 0) && (dy > 0)):
                    console.log('отработал 2');
                    angl = Math.PI - rumb;
                    break;
                case ((dx < 0) && (dy < 0)):
                    console.log('отработал 3');
                    angl = Math.PI + rumb;
                    break;
                case ((dx > 0) && (dy < 0)):
                    console.log('отработал 4');
                    angl = 2 * Math.PI - rumb;
                    break;
                default:
                    console.log('отработал 1');
                    angl = rumb;
            }
         */
        /*     if (dx < 0) {
                angl += angl + Math.PI;
            }else if(){
    
            }else if(){
    
            }else{} */
        return {
            distance: dist,
            angle: angl
        };
    }

    regular_polygon_C(xC, yC, R, n, fi0) {
        if ((R <= 0) || (n < 3)) {
            return 'ошибка многоугольника';
        }
        let coord = [];
        for (let i = 0; i < n; i++) {
            coord[i] = {};
            coord[i].id = i;
            coord[i].coordinates = []; //прописать в класс координат
            coord[i].coordinates[0] = xC + R * Math.cos(fi0 + 2 * Math.PI * i / n);
            coord[i].coordinates[1] = yC + R * Math.sin(fi0 + 2 * Math.PI * i / n);
        }
        /* середины граней */
        let edge = []; /* 107.6 / 100 */
        let k = 0; /* 107.6 / 100 */
        for (let j = 0; j < n; j++) {
            if ((j + 1) >= n) {
                k = 0;
            } else {
                k = j + 1;
            }

            edge[j] = [];
            edge[j].id = j + n;
            m0 = drive1(coord[j][1], coord[j][2], coord[k][1], coord[k][2], 1 / 2);
            edge[j].coordinates = [];
            edge[j].coordinates[0] = m0.x;
            edge[j].coordinates[1] = m0.y;
        }
        console.log(edge);
        let coord2 = coord.concat(edge);

        /* центральная точка */
        let centr_0 = {
            id: 0,
            coordinates: [xC, yC]
        };
        console.log(centr_0);
        coord3 = coord.concat(centr_0);
        return coord;
    }
    drive1([x1, y1], [x2, y2], step) {
        if (step <= 0) {
            return 'ошибка шага';
        }
        nav = this.distAngl2D([x1, y1], [x2, y2]);
        a1 = nav.distance * step;
        a2 = nav.angle;
        coord = this.newXY([x1, y1], [a1, a2]);
        return coord;
    }
}

function DistAngl2(x1, y1, x2, y2) {
    dx = x2 - x1;
    dy = y2 - y1;
    dist = Math.sqrt(dx ** 2 + dy ** 2);
    rumb = Math.atan2(dy, dx);
    angl = rumb;
    /* 
    вычисление в случае расчета румба
    console.log(rumb)
        switch (true) {
            case ((dx < 0) && (dy > 0)):
                console.log('отработал 2');
                angl = Math.PI - rumb;
                break;
            case ((dx < 0) && (dy < 0)):
                console.log('отработал 3');
                angl = Math.PI + rumb;
                break;
            case ((dx > 0) && (dy < 0)):
                console.log('отработал 4');
                angl = 2 * Math.PI - rumb;
                break;
            default:
                console.log('отработал 1');
                angl = rumb;
        }
     */
    /*     if (dx < 0) {
            angl += angl + Math.PI;
        }else if(){

        }else if(){

        }else{} */
    return {
        distance: dist,
        angle: angl
    };
}
/* вычиеление координат на основе угла и растояния*/
function NewXY(x0, y0, dist, angl) {
    dx = Math.cos(angl) * dist;
    dy = Math.sin(angl) * dist;
    newx = x0 + dx;
    newy = y0 + dy;
    return {
        x: newx,
        y: newy
    };
}

/* построить правельный многогранник через описвнную окружность */
function regular_polygon_C(xC, yC, R, n, fi0) {
    if ((R <= 0) || (n < 3)) {
        return 'ошибка многоугольника';
    }
    let coord = [];
    for (let i = 0; i < n; i++) {
        coord[i] = [];
        coord[i][0] = i;
        coord[i][1] = xC + R * Math.cos(fi0 + 2 * Math.PI * i / n);
        coord[i][2] = yC + R * Math.sin(fi0 + 2 * Math.PI * i / n);
    }
    /* середины граней */
    let edge = []; /* 107.6 / 100 */
    let k = 0; /* 107.6 / 100 */
    for (let j = 0; j < n; j++) {
        if ((j + 1) >= n) {
            k = 0;
        } else {
            k = j + 1;
        }

        edge[j] = [];
        edge[j][0] = j + n;
        m0 = drive1(coord[j][1], coord[j][2], coord[k][1], coord[k][2], 1 / 2);
        edge[j][1] = m0.x;
        edge[j][2] = m0.y;
    }
    console.log(edge);
    coord2 = coord.concat(edge);


    /* центральная точка */
    let centr = [
        [0, xC, yC]
    ];
    console.log(centr);
    coord3 = coord.concat(centr);
    return coord;
}
/* функция движения */
function drive1(x1, y1, x2, y2, step) {
    if (step <= 0) {
        return 'ошибка шага';
    }
    nav = DistAngl2(x1, y1, x2, y2);
    a1 = nav.distance * step;
    a2 = nav.angle;
    coord = NewXY(x1, y1, a1, a2);
    return coord;
}

/*  правила выбора */
function conditions(n) {
    resalt = Math.round(Math.random() * (n - 1));
    return resalt;
}

function step(n) {
    let b = Math.PI / n * 2;
    console.log('b: ', b);
    let a = b / 2;
    console.log('a: ', a);
    let r_01 = Math.tan(a) + 1;
    console.log('R/R`: ', r_01);
    let r_12 = Math.tan(a) - 1;
    console.log('R`/r: ', r_12);
    let r_02 = 1 / Math.cos(a * 2);
    console.log('R/r: ', r_02);
    let R = Math.cos(a * 2) + 2 / (Math.tan(a) + 1);
    return (R)
}


/* вводные */

let x0 = 400; /* координата начала */
let y0 = 400; /* координата начала */
let R0 = 400; /* радиус */
let n = 6; /* количество вершин фигуры */
let fi = 0; /* начальный поворот фигуры в радианах */
let step0 = 107.6 / (100 * ((1 + Math.sqrt(5)) / 2)); /* шаг 240 / 300*/
console.log(step(n));
console.log(step0, 1 / step0);
let interatif = 200000; /* итераций */

let xstart = Math.random() * (R0 - 1); /* координата случайной точеки */
let уstart = Math.random() * (R0 - 1); /* координата случайной точеки */

let list_coord = []; /* массив */
let text_list_coord = 'i; bonth; old_bonth; type; x; y\n'; /* массив в тексет */
let bonth = 0; /* кубик */
let old_bonth = 0;

let fig0 = regular_polygon_C(x0, y0, R0, n, fi);
console.log(fig0);
let list_coord_start = []; /* координата стартовых позицый */

for (let i = 0; i < interatif; i++) {
    list_coord[i] = [];
    bonth = conditions(fig0.length, bonth);
    let i_step = drive1(xstart, уstart, fig0[bonth][1], fig0[bonth][2], step0);
    list_coord[i][0] = i;
    list_coord[i][1] = bonth;
    list_coord[i][2] = old_bonth;
    list_coord[i][3] = 'move point';
    list_coord[i][4] = i_step.x;
    list_coord[i][5] = i_step.y;
    text_list_coord += `${i}; ${bonth}; ${old_bonth}; ${'move point'}; ${i_step.x}; ${i_step.y}\n`;
    xstart = i_step.x;
    уstart = i_step.y;
    old_bonth = bonth;
}
console.log(text_list_coord);





/* тестировка */
/* let x1 = 0,
    y1 = 0,
    x2 = 10,
    y2 = 10; */
/* let nav = DistAngl2(x1, y1, x2, y2);
console.log(nav);
let coord = NewXY(x1, y1, nav.distance, nav.angle);
console.log(coord);*/
/* let fig = regular_polygon_C(0, 0, R0, n, 0);
console.log(fig); */
/* let step1 = drive1(x0, y0, x2, y2, step0);
console.log(step1); */