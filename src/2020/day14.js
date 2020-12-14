export function part1(input) {
  const commands = input.split('\n').map(cmd => cmd.split(' = '));
  const map = {};
  let mask;
  commands.forEach(([address, value]) => {
    if (address === 'mask') {
      mask = value.split('');
    } else {
      value = Number(value).toString(2).padStart(36, 0).split('');
      mask.forEach((x, i) => x !== 'X' && (value[i] = x));
      map[address] = parseInt(value.join(''), 2);
    }
  });
  return Object.values(map).reduce((a, b) => a + b, 0);
}

export function part2(input) {
  const commands = input.split('\n').map(cmd => cmd.split(' = '));
  const map = {};
  let mask;
  commands.forEach(([address, value]) => {
    if (address === 'mask') {
      mask = value.split('');
    } else {
      const floating = [];
      [, address] = address.match(/^mem\[(\d+)\]/);
      address = Number(address).toString(2).padStart(36, 0).split('');
      mask.forEach((x, i) => {
        x === 'X' && floating.push(i);
        x !== '0' && (address[i] = x);
      });
      const combinations = Number(Math.pow(2, floating.length));
      for (let i = 0; i < combinations; i++) {
        const fill = Number(i).toString(2).padStart(floating.length, 0);
        floating.forEach((x, i) => (address[x] = fill[i]));
        map[address.join('')] = +value;
      }
    }
  });
  return Object.values(map).reduce((a, b) => a + b, 0);
}
