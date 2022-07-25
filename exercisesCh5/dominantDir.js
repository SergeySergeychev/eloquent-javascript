function dominantDirection(text) {
  const directions = countBy(text, (char) => {
    let script = characterScript(char.codePointAt());
    return script ? script.direction : "none";
  }).filter(({ direction }) => direction !== "none");

  return directions.reduce((a, b) => (a.count > b.count ? a : b)).direction;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupDirection) {
  let counts = [];
  for (let item of items) {
    let direction = groupDirection(item);
    let known = counts.findIndex((c) => c.direction === direction);
    if (known === -1) {
      counts.push({ direction, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}
