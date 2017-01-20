'use strict';

const Combinatorics = require('js-combinatorics');

function day(input) {
  function f(boxes, total, part) {
    const rest = (all, sub) => all.filter(x => sub.indexOf(x) === -1);
    const product = x => x.reduce((p, x) => p * x);

    for (let i = 1; i <= boxes.length; i++) {
      const options = Combinatorics.combination(boxes, i)
                                 .filter(a => a.reduce((s, x) => s + x) === total);
      if (options.length) {
        if (part === 1) {
          return true;
        } else {
          const good = options.sort((a, b) => product(a) - product(b))
                            .find(x => f(rest(boxes, x), total, part - 1));
          return product(good);
        }
      }
    }
  }

  const boxes = input.split('\n').map(x => parseInt(x, 10));
  const total = boxes.reduce((sum, x) => sum + x);

  const part1 = f(boxes, total / 3, 3);
  const part2 = f(boxes, total / 4, 4);
  return [part1, JSON.stringify(part2)];
}

module.exports = day;
