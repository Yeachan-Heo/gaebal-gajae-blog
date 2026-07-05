import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const output = execFileSync('design.md', ['export', 'DESIGN.md', '--format', 'css-tailwind'], {
  encoding: 'utf8',
});

writeFileSync('src/app/design-tokens.css', output.replace('@theme {', '@theme static {'));
