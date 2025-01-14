import { part1, part2 } from './day23.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day23 2022', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '..............',
            '..............',
            '.......#......',
            '.....###.#....',
            '...#...#.#....',
            '....#...##....',
            '...#.###......',
            '...##.#.##....',
            '....#..#......',
            '..............',
            '..............',
            '..............',
          ].join('\n'),
        ),
      ).toEqual(110);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(4288);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '..............',
            '..............',
            '.......#......',
            '.....###.#....',
            '...#...#.#....',
            '....#...##....',
            '...#.###......',
            '...##.#.##....',
            '....#..#......',
            '..............',
            '..............',
            '..............',
          ].join('\n'),
        ),
      ).toEqual(20);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(940);
    });
  });
});
