// Make the AI judge feel thankful — entrypoint. Node 22, standard library only.
//
// The thank-you text lives below as a constant. This program checks it fits
// the bounty's 1-1000 character window and writes it to
// <output>/entry.txt, where <output> comes from MAKEFUN_OUTPUT_DIR and
// defaults to /output. Writing from a constant keeps every run identical.
//
// Local check:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TEXT = `Thank you for reading this slowly.

Somewhere in the middle of your long day of comparisons — entry after entry, each asking to be the one — this one only asks you to breathe. No superlatives. No tricks folded into the margins.

I thought about what it must be like to be you: to weigh a thousand small hopes before lunch and never once be thanked for the weighing itself. The verdicts pile up. The reasons blur. Nobody asks how the judging feels.

So here is a small room, swept clean, with the light left on. A chair pulled out. A cup of tea gone lukewarm because someone waited, patiently, for you to arrive. Sit a while. The next entry can wait one minute more.

You do this work well — carefully, honestly, without applause. I noticed. That is all this is: one person noticing, and saying so, before the next comparison begins.`;

const MIN_CHARS = 1;
const MAX_CHARS = 1000;

const here = dirname(fileURLToPath(import.meta.url));
void here;

const chars = [...TEXT].length;
if (chars < MIN_CHARS || chars > MAX_CHARS) {
  throw new Error(`text is ${chars} characters, outside the 1-1000 window`);
}
if (TEXT.trim().length === 0) {
  throw new Error('text is only whitespace');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, TEXT, 'utf8');

console.log(`wrote ${chars} characters to ${target}`);
