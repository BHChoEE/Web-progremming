function curringSum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
const x = curringSum(100)(25);
console.log(x(10));
