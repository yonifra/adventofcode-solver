/* global importScripts, self */
import { solver } from './solver.js';

async function solveAll(session, year, day) {
  for (; day <= 25; day++) {
    try {
      self.postMessage({ type: 'day', day });
      await solver(session, year, `${day}`);
    } catch (e) {
      console.log(e);
    }
  }
}

importScripts(
  'https://unpkg.com/js-combinatorics@0.6.1/combinatorics.js',
  'https://unpkg.com/node-forge@0.9.2/dist/forge.min.js',
);
self.onmessage = async e => {
  await solveAll(e.data.session, e.data.year, e.data.day);
  self.postMessage({ type: 'done' });
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
console.log = (...args) => {
  const str = args.map(x => `${x}`).join(' ');
  self.postMessage({ type: 'log', log: str });
};
self.postMessage({ type: 'ready' });
