// relative import
import importedObject from './example-dependency'

console.log(importedObject)

// function to make functions that square with a function!
// https://babeljs.io/docs/learn-es6/#arrows
let mapWithArgs = (fn)=>(elems)=>elems.map(fn);
let squareAll = mapWithArgs((n) => n * n);

class MySquaredList {
  // constructor using a spread to convert args to array
  // https://babeljs.io/docs/learn-es6/#default-rest-spread
  constructor(...list){
    this.squaredList = squareAll(list)
  }
}

// new instance of class
var squaredListInstance = new MySquaredList(0,1,2,3);

console.log(squaredListInstance.squaredList)

// Example JSX code
let jsxElement = (
  <div className='container'>
    <h2>Foo</h2>
    <span className='example'>Bar</span>
  </div>
)

// multiple exports
// https://babeljs.io/docs/learn-es6/#modules
export default MySquaredList;
// default export and aliased export
export { squaredListInstance as myList };

/**
 * Other Features of Webpack:
 *
 * Asyncronous imports
 * CJS11 imports
 * JSON imports
 * CSS / Less / Sass imports
 * Uglification, dedupe, common files
 * many more features
 *
 */