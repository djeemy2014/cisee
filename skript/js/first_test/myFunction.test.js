import {sum} from 'C:/Users/ddemidyuk/Documents/WORK/script/education/skript/js/first_test/myFunction.js'
//const sum = require('./myFunction.js');
//import test from 'jest'

console.log(sum(1, 2))
test(`adds ${1} +  ${2} to equal 3`, () => {
    expect(sum(1, 2)).toBe(3);
  });