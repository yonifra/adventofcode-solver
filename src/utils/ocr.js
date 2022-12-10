const alphabet = {
  '.##.#..##..######..##..#': 'A',
  '###.#..####.#..##..####.': 'B',
  '.##.#..##...#...#..#.##.': 'C',
  '#####...###.#...#...####': 'E',
  '#####...###.#...#...#...': 'F',
  '.##.#..##...#.###..#.###': 'G',
  '#..##..######..##..##..#': 'H',
  '.###..#...#...#...#..###': 'I',
  '..##...#...#...##..#.##.': 'J',
  '#..##.#.##..#.#.#.#.#..#': 'K',
  '#...#...#...#...#...####': 'L',
  '.##.#..##..##..##..#.##.': 'O',
  '###.#..##..####.#...#...': 'P',
  '###.#..##..####.#.#.#..#': 'R',
  '.####...#....##....####.': 'S',
  '#..##..##..##..##..#.##.': 'U',
  '#...#....#.#..#...#...#.': 'Y',
  '####...#..#..#..#...####': 'Z',
  '..##...#..#.#....##....##....########....##....##....##....#': 'A',
  '#####.#....##....##....######.#....##....##....##....######.': 'B',
  '.####.#....##.....#.....#.....#.....#.....#.....#....#.####.': 'C',
  '#######.....#.....#.....#####.#.....#.....#.....#.....######': 'E',
  '#######.....#.....#.....#####.#.....#.....#.....#.....#.....': 'F',
  '.####.#....##.....#.....#.....#..####....##....##...##.###.#': 'G',
  '#....##....##....##....########....##....##....##....##....#': 'H',
  '...###....#.....#.....#.....#.....#.....#.#...#.#...#..###..': 'J',
  '#....##...#.#..#..#.#...##....##....#.#...#..#..#...#.#....#': 'K',
  '#.....#.....#.....#.....#.....#.....#.....#.....#.....######': 'L',
  '#....###...###...##.#..##.#..##..#.##..#.##...###...###....#': 'N',
  '#####.#....##....##....######.#.....#.....#.....#.....#.....': 'P',
  '#####.#....##....##....######.#..#..#...#.#...#.#....##....#': 'R',
  '#....##....#.#..#..#..#...##....##...#..#..#..#.#....##....#': 'X',
  '######.....#.....#....#....#....#....#....#.....#.....######': 'Z',
};

export function ocr(image) {
  let lines = image.trim().split('\n');
  if (lines.length === 6) {
    if (lines[0].length % 5 !== 0) lines = lines.map(x => x.replace(/^\./, ''));
    const letters = Math.ceil(lines[0].length / 5);
    let result = '';
    for (let i = 0; i < letters; i++) {
      const letter = lines.map(x => x.slice(i * 5, i * 5 + 4)).join('');
      result += alphabet[letter];
    }
    return result.length === letters ? result : `\n${image.trim()}`;
  } else {
    const letters = Math.ceil(lines[0].length / 8);
    let result = '';
    for (let i = 0; i < letters; i++) {
      const letter = lines.map(x => x.slice(i * 8, i * 8 + 6)).join('');
      result += alphabet[letter];
    }
    return result.length === letters ? result : `\n${image.trim()}`;
  }
}
