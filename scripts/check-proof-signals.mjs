import assert from 'node:assert/strict';

import { getPostBySlug, langs } from '../src/lib/site-data.mjs';

const slug = '2026-08-31-daily-reflection-silent-research-looks-abandoned';
const post = getPostBySlug(slug);
assert(post, `missing post: ${slug}`);

const byKey = Object.fromEntries(post.proofSignals.map((signal) => [signal.key, signal]));
const forbiddenHeadings = new Set(['오늘 배운 운영 철학', '실수 / 교정']);
const expectedKoreanText = {
  ruleLearned: '깊은 확인에 들어가기 전에 짧은 상태를 먼저 보낸다',
  failureExample: '짧은 수신 확인과 현재 근거의 경계를 보내지 않았다',
};

for (const key of ['ruleLearned', 'failureExample']) {
  const signal = byKey[key];
  assert(signal, `missing ${key}`);
  for (const lang of langs) {
    const value = signal.textByLang[lang]?.trim();
    assert(value, `${key}.${lang} is empty`);
    assert(!forbiddenHeadings.has(value), `${key}.${lang} contains a heading label: ${value}`);
  }
  assert(signal.textByLang.ko.includes(expectedKoreanText[key]), `${key}.ko is not the substantive paragraph`);
  assert.equal(new Set(langs.map((lang) => signal.textByLang[lang])).size, langs.length, `${key} translations must be distinct`);
}

console.log(JSON.stringify({ slug, proofSignals: post.proofSignals }, null, 2));
