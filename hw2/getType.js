function getType(t)
{
  if (typeof (t) === 'function')
  {
    return 'function';
  }
  else if (t === undefined)
  {
    return 'undefined';
  }
  if (t === null)
  {
    return 'null';
  }
  else if (Array.isArray(t))
  {
    return 'array';
  }
  else if (typeof (t) === 'object')
  {
    return 'object';
  }
  else if (isNaN(t) === true)
  {
    return 'NaN';
  }
  return typeof (t);
}

console.log(getType(1)); // 'number'
console.log(getType(NaN)); // 'NaN'
console.log(getType('1')); // 'string'
console.log(getType(() => {})); // 'function' X
console.log(getType({})); // 'object'
console.log(getType([])); // 'array'
console.log(getType(null)); // 'null' X
console.log(getType(undefined)); // 'undefined' X
