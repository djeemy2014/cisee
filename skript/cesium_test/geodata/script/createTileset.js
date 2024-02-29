//import Math from 'math'
import {Transforms, Cartesian3,Matrix4, Math as MathCesium} from 'cesium'
import {S2Cell} from '@cesium/engine'
import anyBase from 'any-base'
import {PythonShell} from 'python-shell';


const bin2dec=anyBase(anyBase.BIN, anyBase.DEC)
const dec2bin=anyBase(anyBase.DEC, anyBase.BIN)
const bin2hex=anyBase(anyBase.BIN, anyBase.HEX)
const hex2bin=anyBase(anyBase.HEX, anyBase.BIN)

const S2_LOOKUP_POSITIONS = [];
const S2_LOOKUP_IJ = []
const S2_SWAP_MASK = 1;
const S2_INVERT_MASK = 2;
const S2_MAX_LEVEL = 30;
const S2_POSITION_BITS = 2 * S2_MAX_LEVEL + 1;
const S2_LOOKUP_BITS = 4;
const S2_POSITION_TO_IJ = [
    [0, 1, 3, 2], // 0: Normal order, no swap or invert
    [0, 2, 3, 1], // 1: Swap bit set, swap I and J bits
    [3, 2, 0, 1], // 2: Invert bit set, invert bits
    [3, 1, 0, 2], // 3: Swap and invert bits set
  ];
const S2_POSITION_TO_ORIENTATION_MASK = [
    S2_SWAP_MASK,
    0,
    0,
    S2_SWAP_MASK | S2_INVERT_MASK,
  ];

function generateLookupCell(
    level,
    i,
    j,
    originalOrientation,
    position,
    orientation
  ) {
    if (level === S2_LOOKUP_BITS) {
      const ij = (i << S2_LOOKUP_BITS) + j;
      S2_LOOKUP_POSITIONS[(ij << 2) + originalOrientation] =
        (position << 2) + orientation;
      S2_LOOKUP_IJ[(position << 2) + originalOrientation] =
        (ij << 2) + orientation;
    } else {
      level++;
      i <<= 1;
      j <<= 1;
      position <<= 2;
      const r = S2_POSITION_TO_IJ[orientation];
      generateLookupCell(
        level,
        i + (r[0] >> 1),
        j + (r[0] & 1),
        originalOrientation,
        position,
        orientation ^ S2_POSITION_TO_ORIENTATION_MASK[0]
      );
      generateLookupCell(
        level,
        i + (r[1] >> 1),
        j + (r[1] & 1),
        originalOrientation,
        position + 1,
        orientation ^ S2_POSITION_TO_ORIENTATION_MASK[1]
      );
      generateLookupCell(
        level,
        i + (r[2] >> 1),
        j + (r[2] & 1),
        originalOrientation,
        position + 2,
        orientation ^ S2_POSITION_TO_ORIENTATION_MASK[2]
      );
      generateLookupCell(
        level,
        i + (r[3] >> 1),
        j + (r[3] & 1),
        originalOrientation,
        position + 3,
        orientation ^ S2_POSITION_TO_ORIENTATION_MASK[3]
      );
    }
  }

function generateLookupTable() {
    generateLookupCell(0, 0, 0, 0, 0, 0);
    generateLookupCell(0, 0, 0, S2_SWAP_MASK, 0, S2_SWAP_MASK);
    generateLookupCell(0, 0, 0, S2_INVERT_MASK, 0, S2_INVERT_MASK);
    generateLookupCell(
      0,
      0,
      0,
      S2_SWAP_MASK | S2_INVERT_MASK,
      0,
      S2_SWAP_MASK | S2_INVERT_MASK
    );
  }

const url_json_file=''
const url_path='../testModel/3dtiles/MyTileCreat/'
const lvl = 7
const box = [
    0.840939801,	0.735924155,	
    0.841576133,	0.73680637, 
    0,              50
]
const modelMatrix = Transforms.eastNorthUpToFixedFrame(
    Cartesian3.fromRadians(box[0],box[1], 0)
);
const modelMatrix2 = Transforms.eastNorthUpToFixedFrame(
    Cartesian3.fromRadians((box[0]+box[2])/2,(box[1]+box[3])/2, 0)
);
const modelMatrix23 = Transforms.eastNorthUpToFixedFrame(
    Cartesian3.fromRadians((box[0]+box[2])/2,(box[1]+box[3])/2, 0)
);
const modelMatrix33 = Transforms.fixedFrameToHeadingPitchRoll(
    modelMatrix23
);
const modelMatrix3 = Transforms.eastNorthUpToFixedFrame(
    Cartesian3.fromRadians(box[2],box[3], 0)
);
function localMatrix4(matrix44, localpoint, resalt){
    let orietation = Transforms.fixedFrameToHeadingPitchRoll(matrix44)
    //console.log(new Matrix4.getScale(matrix44, new Cartesian3()))
    //console.log(orietation)
}

const start_data={
    "asset" : {
        "version" : "1.1"
    },
    "metadata" : {
        "class" : "exampleTilesetMetadataClass",
        "properties" : {
          "author" : "DJeeMY",
          "date" : "2024-03-21",
          "tileCount" : 4
        }
      },
    "root":{
        transform:[],
        boundingVolume:{
            
        }
    }
}
function creatTileset(lvl=0){

}
function faceFromXYZ(vector){
    let face=undefined
    
    const vectorArr = Object.values(vector)
    const vectorArrAbs = Object.values(vector).map((elem)=>Math.abs(elem))
    const indexMax=vectorArrAbs.findIndex((elem,index, arr)=>elem==Math.max(...arr))
    const vectorPlus=vectorArr[indexMax]===vectorArrAbs[indexMax]
    //console.log(vector)
    //console.log(indexMax)
    //console.log(Object.keys(vector)[indexMax])
    //console.log(vectorPlus)
    switch(Object.keys(vector)[indexMax]){
        case'x':
        face=vectorPlus?0:3
            break
        case('y'):
        face=vectorPlus?1:4
            break
        case('z'):
        face=vectorPlus?2:5
            break
        default:
            return new Error('vectorArrAbs is error ')
    }
    return face
}
function UVFromXYZFace(vector, face){
    let u=undefined
    let v=undefined
    //console.log(face)
    switch(face){
        case 0:
            u = vector.y/vector.x; 
            v = vector.z/vector.x
            break
        case 1:
            u = vector.x/vector.y*(-1); 
            v = vector.z/vector.y
            break
        case 2:
            u = vector.x/vector.z*(-1); 
            v = vector.y/vector.z*(-1)
            break
        case 3:
            u = vector.z/vector.x; 
            v = vector.y/vector.x
            break
        case 4:
            u = vector.z/vector.y; 
            v = vector.x/vector.y*(-1)
            break
        case 5:
            u = vector.y/vector.z*(-1); 
            v = vector.z/vector.x*(-1)
            break
        default:
            break
    }

    return [face,u,v]
}
function STFromUV(u,v){
    let s,t
    if(u>=0){
        s=Math.sqrt(1+3*u)/2
    }else{
        s=1-Math.sqrt(1-3*u)/2
    }
    if(v>=0){
        t=Math.sqrt(1+3*v)/2
    }else{
        t=1-Math.sqrt(1-3*v)/2
    }
    return [s,t]
}
function IJFromST(s,t){
    const i = Math.max(0,Math.min(Math.pow(2,30)-1,Math.pow(2,30)*s))
    const j = Math.max(0,Math.min(Math.pow(2,30)-1,Math.pow(2,30)*t))
    
    return [i,j]
}
function cellIDFrom(face,i,j,level){
    if (S2_LOOKUP_POSITIONS.length === 0) {
        console.log(generateLookupTable());

      }
    let bits = face & S2_SWAP_MASK
    let cell_id = face << (S2_POSITION_BITS - 1) 
    let lookup_mask = (1 << S2_LOOKUP_BITS) - 1
    let required_steps = Math.ceil((level + 2) / 4)
    console.log(bits, cell_id, lookup_mask, required_steps)
    for (let k=7; k>(7 - required_steps); k--){
        let offset = k * S2_LOOKUP_BITS
        bits += ((i >> offset) & lookup_mask) << (S2_LOOKUP_BITS + 2)
        bits += ((j >> offset) & lookup_mask) << 2
        bits = S2_LOOKUP_POSITIONS[bits]
        cell_id |= (bits >> 2) << (k * 2 * S2_LOOKUP_BITS)
        bits &= S2_SWAP_MASK | S2_INVERT_MASK
    }
    cell_id = cell_id << 1
    let least_significant_bit_mask = 1 << (2 * (S2_MAX_LEVEL - level))
    cell_id = (cell_id & -least_significant_bit_mask) | least_significant_bit_mask
    return cell_id
}

function latlon2S2Cell(lat,lon, level=0){
    //face point
    //const level = 18
    const vector={
        x:Math.cos(lat)*Math.cos(lon),
        y:Math.cos(lat)*Math.sin(lon),
        z:Math.sin(lat)
    }
    let face=faceFromXYZ(vector)
    let [face2,u,v] =UVFromXYZFace(vector,face)
    let [s,t]=STFromUV(u,v)
    let [i,j]=IJFromST(s,t)
    console.log(face,i,j)
    let cell_id=cellIDFrom(face,i,j,level)
    console.log(Math.abs(cell_id))
    
    console.log(dec2bin(`${Math.abs(cell_id)}`))
    //console.log(S2Cell(cell_id))
}
//console.log(getSizeIJ(3))
async function latlonToS2Cell(lat,lon,level){
    let options = {
        mode: 'text',
        //pythonPath: 'c:/python311/python.exe',
        pythonOptions: ['-u'], // get print results in real-time
        //scriptPath: 'C:/Users/ddemidyuk/Documents/WORK/script/education/skript/cesium_test/geodata/script/',
        args: ['value1', 'value2', 'value3']
      };
    
   
    return new Promise((res,rej)=>{
        PythonShell.runString(`from s2cell import lat_lon_to_token; print (lat_lon_to_token(${lat}, ${lon}, ${level}))`, null)
        .then(messages=>{
            res(messages[0])
            console.log(1)
          })
        .catch(rej);
    })
}
// console.log(await latlonToS2Cell(42.16534812323142, 48.18230142187132, 9))
// console.log(await latlonToS2Cell(42.16534812323142, 48.18230142187132, 10))
// console.log(await latlonToS2Cell(42.16534812323142, 48.18230142187132, 11))
// console.log(await latlonToS2Cell(42.16534812323142, 48.18230142187132, 20))

console.log(await latlonToS2Cell(42.16451156080417206,48.18143857440990274,10))
console.log(await latlonToS2Cell(42.16451156080417206,48.22047180015461265,10))
console.log(await latlonToS2Cell(42.2187737231593303,48.22047180015461265,10))
console.log(await latlonToS2Cell(42.2187737231593303,48.18143857440990274,10))
console.log(await latlonToS2Cell(42.16451156080417206,48.18143857440990274,10))


//.then(
//    messages=>{
//        console.log(messages)
//      }
//)

//latlon2S2Cell(0, Math.PI/2,0)
//latlon2S2Cell(Math.PI/2, 0,0)
//latlon2S2Cell(0, 0,0)
//latlon2S2Cell(0, 0,1)
//console.log(modelMatrix)
//console.log(modelMatrix)
//console.log(modelMatrix2)
//console.log(modelMatrix3)
//localMatrix4(modelMatrix,0,0)
//console.log(m34)

//console.dir(new S2Cell.fromToken('3'))
//console.dir(0 & S2_SWAP_MASK)
//console.dir(new S2Cell.fromToken('5').getCenter())
//console.dir(S2Cell.getTokenFromId(new S2Cell.fromToken('5').getChild(0)._cellId))
//
//console.dir(new S2Cell.fromToken('44').getCenter())
// console.dir(dec2bin('2') )
// console.dir(dec2bin(2) )
 //console.dir(dec2bin('-2') )
// console.dir(bin2hex('0011') )
// console.dir(bin2hex('1001') )
// console.dir(bin2hex('010100000000') )
// console.dir(bin2hex('001011000000') )
// console.dir(hex2bin('2c') )
// console.dir(hex2bin('3') ) 