function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source === "...") {
    return;
  }
  yes.forEach((s) => {
    if (!regexp.test(s)) {
      console.log(`Didn't find match in sentence: ${s}`);
    }
  });

  no.forEach((s) => {
    if (regexp.test(s)) {
      console.log(`Unexpected match in sentence: ${s}`);
    }
  });
}

let test1 = verify(
  /\bca(r|t)s?(?![$/{~^_\[\]])\b/,
  ["my cars", "bad cats"],
  ["camper", "high art"]
);

let test2 = verify(/\bp(rops?|r?op)\b/, ["pop culture", "mad prop"], ["plop"]);
let test3 = verify(
  /\bferr(et|y|ari)(?![$/{~^_\[\]])\b/,
  ["ferret abc", "ferry", "ferrari"],
  ["ferrum", "transfer A"]
);

let test4 = verify(
  /\b\w+ious(?![$/{~^_\[\]])\b/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]
);

let test5 = verify(/\s([.,:]+)+?/, ["bad punctuation ."], ["escape the dot"]);

let test6 = verify(
  /\w{7,}/,
  ["hottentottententen"],
  ["no", "hotten totten tenten"]
);

let test7 = verify(
  /\b[^\We]+\b/,
  ["red platypus", "wobbling nest"],
  ["earth bed", "learning ape"]
);

// solution by Marijn Haverbeke
let test1MH = verify(
  /ca[rt]/,
  ["my cars]", "bad cats"],
  ["camper", "high art"]
);

let test2MH = verify(/pr?op/, ["pop culture", "mad props"], ["plop", "prrrop"]);

let test3MH = verify(
  /ious\b/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]
);

let test4MH = verify(/\s[.,:;]/, ["bad punctuation ."], ["escape the dot"]);

let test5MH = verify(
  /\w{7}/,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"]
);

let test6MH = verify(
  /\b[^\We]+\b/i,
  ["red platypus", "wobbling nest"],
  ["earth bed", "learning ape", "BEET"]
);
