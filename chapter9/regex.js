let re1 = new RegExp("ab//c");
let re2 = /ab\/\/c/;
let re3 = /ABC/;
let re4 = /[0123456789]/g;
let re5 = /[0-9]/;
let re6 = /\d+/;
let re7 = /\w/;
let re8 = /\s/;
let re9 = /\D/;
let re10 = /\W/;
let re11 = /\S/;
let re12 = /./;
let re13 = /[^01]/;
let re14 = /'\d+'/;
let re15 = /'\d*'/;
let re16 = /neighbou?r/;
let re17 = /\d{2,5}/;
let re18 = /boo+(hoo+)+/i;
let re19 = /bad(ly)?/;
let re20 = /(\d)+/;
let re21 = /^\d+$/;
let re22 = /\d+/;
let re23 = /^!/;
let re24 = /x^/;
let re25 = /cat/;
let re26 = /\bcat\b/;
let re27 = /[01]?/;
let re28 = /\b([01]+b|\d+|[\da-f]h)\b/;
let re29 = /[ou]/;
let re30 = /p/g;
let re31 = /([\w]+), ([\w]+)/g;
let re32 = /\b(cia|fbi)\b/g;
let re33 = /(\d+)\s(\w+)/g;
let re34 = /[^]/g;

let eighteenPlus = /eighteen\+/;
let quotedText = /'([^']?)'/;
let dateTime = /\d\d-\d\d-\d\d\d\d\s\d\d:\d\d/;
let dateTimeUpgrade = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
let animalCount = /\b\d+\s(pig|cow|chicken)s?\b/;

let str = "the cia and fbi";
let rep = "$2 $1";
let names = "Hopper, Grace\nMcCarthy, John\nRitchie, Dennis";
let stock = "1 lemon, 2 cabbages, and 101 eggs, 0 eggs";

// console.log(quotedText.exec("she said 'a'"));
// console.log(re19.exec("bad"));
// console.log(re20.exec("123"));
// console.log(re6.exec(str));
// console.log(str.match(re6));
// console.log(str.match(re34));

let date1 = new Date();
let date2 = new Date(2015, 9, 21);
let date3 = new Date(2009, 11, 9, 12, 59, 59, 999);
let date4 = new Date(1970, 0, 1, 3, 00, 000);
let date5 = new Date(Date.now()).getSeconds();
let date6 = new Date(Date.now()).getMinutes();
let date7 = new Date(Date.now()).getDate();
let date8 = new Date(Date.now()).getMonth();
let date9 = new Date(Date.now()).getFullYear();
let date10 = new Date(Date.now()).getYear();

function findDate(string) {
  let dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
  let match = dateTime.exec(string);
  return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
}

function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})[-.](\d{1,2})[-.](\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}

function replace1(str) {
  return str.toUpperCase();
}

function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (Number(amount) < 0) {
    amount = 0;
  }
  if (amount === 1) {
    unit = unit.slice(0, unit.length - 1);
  } else if (amount === 0) {
    amount = "no";
  }
  console.log(match);
  return amount + " " + unit;
}

function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}

let name = "harry";
let name1 = "dea+hl[]rd";
let text = "Harry has a scar on the forehead.";
let text1 = "This dea+hl[]rd annoyed everybody ";
let regexp1 = new RegExp(`\\b(${name})\\b`, "gi");
let escaped = name1.replace(/[^\w\s]/g, "\\$&");
let regexp2 = new RegExp(`\\b(${escaped})\\b`, "gi");

let pattern = /y/g;
pattern.lastIndex = 3;
let match1 = pattern.exec("xyzzy");

let digit = /\d/g;

// console.log(digit.exec("her2e it is: 1"));
// console.log(digit.lastIndex);
// console.log(digit.exec("and now: 1"));
// console.log(digit.lastIndex);
// console.log("Banana".match(/an/g));
// console.log(/an/g.exec("Banana"));

let input = "String with 3 numbers inside of it... 42 and 88.";
let number = /\b(\d+)\b/g;
let match;
// while ((match = number.exec(input))) {
//   console.log(`Found, ${match[1]} at position ${match.index} `);
// }

function parseINI(string) {
  // Starting object with upper layer configurations.
  let currentSection = { name: null, fields: [] };
  let categories = [currentSection];

  string.split(/\r?\n/).forEach((line, index, arr) => {
    let match;
    if (/^\s*(;.*)?$/.test(line)) {
      return;
    } else if ((match = line.match(/^\[(.*)\]$/))) {
      currentSection = { name: match[1], fields: [] };
      categories.push(currentSection);
    } else if ((match = line.match(/^(\w+)=(.*)$/))) {
      currentSection.fields.push({ name: match[1], value: match[2] });
    } else {
      throw new Error(`Line ${line} contains invalid data`);
    }
  });
  return categories;
}

function parseINI2(string) {
  //Start with an object to hold the top-level fields
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach((line) => {
    let match;
    if ((match = line.match(/^(\w+)=(.*)$/))) {
      section[match[1]] = match[2];
      // console.log(section);
    } else if ((match = line.match(/^\[(.*)\]$/))) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error("Line '" + line + "' is not valid.");
    }
  });
  return result;
}

const INI = `searchengine=http://www.google.com/search?q=$1
spitefulness=9.7

; перед комментариями ставится точка с запятой
; каждая секция относится к отдельному врагу
[larry]
fullname=Larry Doe
type=бычара из детсада
website=http://www.geocities.com/CapeCanaveral/11451

[gargamel]
fullname=Gargamel
type=злой волшебник
outputdir=/home/marijn/enemies/gargamel`;
