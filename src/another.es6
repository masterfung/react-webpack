let theProtoObj = {
  method: ()=>{
    console.log('bound to nothing', this)
  }
}

let handler = (nums) => {
  nums.forEach(v => {
    if (v % 5 === 0)
      fives.push(v);
  });
}

export default {
  // __proto__
  __proto__: theProtoObj,
  // Shorthand for ‘handler: handler’
  handler,
  // Methods
  toString() {
   // Super calls and template strings
   return `d ${super.toString()}`;
  },
  // Computed (dynamic) property names
  [ "prop_" + (() => 42)() ]: 42
};