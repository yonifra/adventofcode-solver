import { lines } from '../utils/commons.js';

export function part1(input) {
  let [timestamp, buses] = lines(input);
  timestamp = +timestamp;
  buses = buses
    .split(',')
    .filter(x => x !== 'x')
    .map(x => +x);

  const next = buses.map(x => {
    let result = 0;
    while (result < timestamp) {
      result += x;
    }
    return result;
  });
  const time = Math.min(...next);
  return (time - timestamp) * buses[next.indexOf(time)];
}

export function part2(input) {
  let buses = lines(input)
    .pop()
    .split(',')
    .map((x, i) => ({ id: +x, offset: i }))
    .filter(({ id }) => !isNaN(id));

  let result = 0;
  let step = 1;
  buses.forEach(({ id, offset }) => {
    while ((result + offset) % id !== 0) {
      result += step;
    }
    step *= id; //assumes bus numbers do not have common divisors
  });
  return result;
}
