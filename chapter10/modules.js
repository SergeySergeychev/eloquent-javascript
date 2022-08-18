// let names = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

function getDayName(number) {
  return names[number];
}

let dayName = (function () {
  let names = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (number) => {
    return names[number];
  };
})();

const weekDay = (function () {
  const names = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return {
    name(number) {
      return names[number];
    },
    number(name) {
      return names.indexOf(name);
    },
  };
})();

(function () {
  function square(x) {
    return x * x;
  }
  let hundred = 100;
})();

(function (exports) {
  const names = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  exports.name = function (number) {
    return names[number];
  };

  exports.number = function (name) {
    return names.indexOf(name);
  };
})((this.day = {}));

let plusOne = new Function("n", "return n + 1");
/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CONVERT TO STRING/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
function convert(obj) {
  let ret = "{";

  for (let k in obj) {
    let v = obj[k];

    if (typeof v === "function") {
      v = v.toString();
    } else if (v instanceof Array) {
      v = JSON.stringify(v);
    } else if (typeof v === "object") {
      v = convert(v);
    } else {
      v = `"${v}"`;
    }

    ret += `\n  ${k}: ${v},`;
  }

  ret += "\n}";

  return ret;
}

function anyToString(valueToConvert) {
  if (valueToConvert === undefined || valueToConvert === null) {
    return valueToConvert === undefined ? "undefined" : "null";
  }
  if (typeof valueToConvert === "string") {
    return `'${valueToConvert}'`;
  }
  if (
    typeof valueToConvert === "number" ||
    typeof valueToConvert === "boolean" ||
    typeof valueToConvert === "function"
  ) {
    return valueToConvert.toString();
  }
  if (valueToConvert instanceof Array) {
    const stringfiedArray = valueToConvert
      .map((property) => anyToString(property))
      .join(",");
    return `[${stringfiedArray}]`;
  }
  if (typeof valueToConvert === "object") {
    const stringfiedObject = Object.entries(valueToConvert)
      .map((entry) => {
        return `${entry[0]}: ${anyToString(entry[1])}`;
      })
      .join(",");
    return `{${stringfiedObject}}`;
  }
  return JSON.stringify(valueToConvert);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
function require(name) {
  const code = Function("exports", `${name.toString()}`);
  console.log(code);
  const exports = {};
  code(exports);
  console.log(exports);
}
