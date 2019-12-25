import { execute } from './day09.js';
import Combinatorics from 'js-combinatorics';

export function part1(input) {
  let mode, doors, items, name, permutations, exit, result;
  const map = {};
  let output = [];
  let commands = [];
  let allItems = [];

  function pushCommand(cmd) {
    commands = commands.concat(`${cmd}\n`.split('').map(x => x.charCodeAt(0)));
  }

  function nextCommand() {
    map[name] = map[name] || { doors, walked: new Set() };
    if (items.length) {
      const x = items.shift();
      pushCommand(`take ${x}`);
      allItems.push(x);
    } else if (
      name === '== Security Checkpoint ==' &&
      !Object.values(map).find(x => x.doors.length > x.walked.size)
    ) {
      if (!permutations) {
        permutations = [];
        for (let num = allItems.length; num > 0; num--) {
          permutations = permutations.concat(
            Combinatorics.combination(allItems, num).toArray(),
          );
        }
      }
      const next = permutations[0];
      if (
        next.length === allItems.length &&
        allItems.every(x => next.includes(x))
      ) {
        permutations.shift();
        pushCommand(exit);
      } else {
        const remove = allItems.find(x => !next.includes(x));
        pushCommand(`drop ${remove}`);
        allItems = allItems.filter(x => x !== remove);
      }
    } else {
      let direction = doors[Math.floor(Math.random() * doors.length)];
      if (map[name].doors.length > map[name].walked.size) {
        const options = map[name].doors.filter(x => !map[name].walked.has(x));
        direction = options[Math.floor(Math.random() * options.length)];
        map[name].walked.add(direction);
      }
      pushCommand(direction);
    }
  }

  function parse(line) {
    if (line[0] !== '-') {
      mode = '';
    }
    if (line[0] === '=') {
      name = line;
      doors = [];
      items = [];
    }
    if (mode === 'doors') {
      const opposite = {
        north: 'south',
        south: 'north',
        west: 'east',
        east: 'west',
      };
      if (name === '== Pressure-Sensitive Floor ==') {
        exit = opposite[line.replace('- ', '')];
      }
      doors.push(line.replace('- ', ''));
    }
    if (mode === 'items') {
      const blacklist = [
        'escape pod',
        'infinite loop',
        'molten lava',
        'giant electromagnet',
        'photons',
      ];
      if (!blacklist.includes(line.replace('- ', ''))) {
        items.push(line.replace('- ', ''));
      }
    }
    if (line === 'Doors here lead:') {
      mode = 'doors';
    }
    if (line === 'Items here:') {
      mode = 'items';
    }
    if (line.match(/You should be able to get in by typing (\d+)/)) {
      [, result] = line.match(/You should be able to get in by typing (\d+)/);
    }
    if (line === 'Command?') {
      nextCommand();
    }
  }

  function write(x) {
    if (x === 10) {
      parse(output.map(x => String.fromCharCode(x)).join(''));
      output = [];
    } else {
      output.push(x);
    }
  }

  const user = { input: () => commands.shift(), output: write, base: 0 };
  const ops = input.split(',').map(x => parseInt(x));
  let ip = 0;
  while (!result) {
    ip = execute(ops, ip, user);
  }
  return result;
}

export const part2 = () => undefined;
