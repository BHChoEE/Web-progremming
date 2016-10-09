function getType(t) {
  if (typeof (t) === 'function') {
    return 'function';
  } else if (t === null) {
    return 'null';
  } else if (typeof (t) === 'object') {
    return 'object';
  } else if (t.constructor === Array) {
    return 'array';
  } else if (isNaN(t) === true) {
    return 'NaN';
  } else if (t === undefined) {
    return 'undefined';
  }
  return typeof (t);
}

console.log(getType(1)); // 'number'
console.log(getType(NaN)); // 'NaN'
console.log(getType('1')); // 'string'
console.log(getType(() => {}); // 'function' X
console.log(getType({})); // 'object'
console.log(getType([])); // 'array'
console.log(getType(null); // 'null' X
console.log(getType(undefined)); // 'undefined' X
