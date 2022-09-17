/*
function zero(cb) {
  let zero = 0;
  return cb != null ? cb(zero) : zero;
}

function one(cb) {
  let one = 1;
  return cb != null ? cb(one) : one;
}

function two(cb) {
  let two = 2;
  return cb != null ? cb(two) : two;
}

function three(cb) {
  let three = 3;
  return cb != null ? cb(three) : three;
}

function four(cb) {
  let four = 4;
  return cb != null ? cb(four) : four;
}

function five(cb) {
  let five = 5;
  return cb != null ? cb(five) : five;
}

function six(cb) {
  let six = 6;
  return cb != null ? cb(six) : six;
}

function seven(cb) {
  let seven = 7;
  return cb != null ? cb(seven) : seven;
}

function eight(cb) {
  let eight = 8;
  return cb != null ? cb(eight) : eight;
}

function nine(cb) {
  let nine = 9;
  return cb != null ? cb(nine) : nine;
}

function plus(n) {
  let rightOperand = n;
  return (leftOperand) => leftOperand + rightOperand;
}

function minus(n) {
  let rightOperand = n;
  return (leftOperand) => leftOperand - rightOperand;
}

function times(n) {
  let rightOperand = n;
  return (leftOperand) => leftOperand * rightOperand;
}

function dividedBy(n) {
  let rightOperand = n;
  return (leftOperand) => leftOperand / rightOperand;
}
*/

var n = function (digit) {
  return function (op) {
    return op ? op(digit) : digit;
  };
};
var zero = n(0);
var one = n(1);
var two = n(2);
var three = n(3);
var four = n(4);
var five = n(5);
var six = n(6);
var seven = n(7);
var eight = n(8);
var nine = n(9);

function plus(r) {
  return function (l) {
    return l + r;
  };
}
function minus(r) {
  return function (l) {
    return l - r;
  };
}
function times(r) {
  return function (l) {
    return l * r;
  };
}
function dividedBy(r) {
  return function (l) {
    return l / r;
  };
}

one(plus(one()))