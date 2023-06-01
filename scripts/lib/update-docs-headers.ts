import fs from 'fs';
import path from 'path';
import { TSESLint } from '@typescript-eslint/utils';
import { pluginId } from './plugin-id';
import { rules } from './rules';
import type { RuleInfo } from './rules';

type ListFormatOptions = {
  type?: 'conjunction' | 'disjunction' | 'unit';
  style?: 'long' | 'short' | 'narrow';
  localeMatcher?: 'lookup' | 'best fit';
};

declare namespace Intl {
  class ListFormat {
    constructor(locale: string, options: ListFormatOptions);
    public format: (items: string[]) => string;
  }
}

const headerPattern = /<!--header-->(\n|.)+<!--header-->/u;
const casePattern = /<!--cases-->(\n|.)+<!--cases-->/gmu;
const footerPattern = /<!--footer-->(\n|.)+<!--footer-->/u;
const ruleRoot = path.resolve(__dirname, '../../src/rules');
const testRoot = path.resolve(__dirname, '../../tests/rules');
const docsRoot = path.resolve(__dirname, '../../docs/rules');
const listFormatter = new Intl.ListFormat('en', { type: 'conjunction' });

/**
 * Render the document header of a given rule.
 */
function renderHeader(rule: RuleInfo): string {
  const lines = [`<!--header--># ${rule.id}`, '', `> ${rule.description}`];

  if (rule.recommended) {
    lines.push(
      `> - ⭐️ This rule is included in \`plugin:${pluginId}/recommended\` preset.`
    );
  }
  if (rule.fixable) {
    lines.push(
      '> - ✒️ The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.'
    );
  }
  if (rule.deprecated) {
    const replace = rule.replacedBy.map(
      (ruleId) => `[${ruleId}](./${ruleId.replace(`${pluginId}/`, '')}.md)`
    );
    const replaceText =
      replace.length === 0
        ? ''
        : ` Use ${listFormatter.format(replace)} instead.`;

    lines.push(`> - ⛔ This rule has been deprecated.${replaceText}`);
  }
  lines.push('', '<!--header-->');

  return lines.join('\n');
}

/**
 * Render code of use cases
 * @param rule {RuleInfo}
 * @returns {string} content
 */
function renderCases(rule: RuleInfo): string {
  const cases = require(`../../tests/rules/${rule.name}`)
    .cases as TSESLint.RunTests<string, []>;
  return `<!--cases-->\n## Cases\n\n### ✅ Correct\n\n${cases.valid
    .map((v) => `\`\`\`ts\n${v}\n\`\`\``)
    .join('\n\n')}\n\n### ❌ Incorrect\n\n${cases.invalid
    .map((v) => `\`\`\`ts\n${v.code}\n\`\`\``)
    .join('\n\n')}\n<!--cases-->`;
}

/**
 * Render the document header of a given rule.
 */
function renderFooter(rule: RuleInfo): string {
  const docsPath = path.dirname(path.resolve(docsRoot, `${rule.name}.md`));
  const rulePath = path
    .relative(docsPath, path.join(ruleRoot, `${rule.name}.ts`))
    .replace(/\\/gu, '/');
  const testPath = path
    .relative(docsPath, path.join(testRoot, `${rule.name}.ts`))
    .replace(/\\/gu, '/');

  return `\n<!--footer-->\n## Implementation\n\n- [Rule source](${rulePath})\n- [Test source](${testPath})\n<!--footer-->`;
}

for (const rule of rules) {
  const filePath = path.resolve(docsRoot, `${rule.name}.md`);
  const original = fs.readFileSync(filePath, 'utf8');
  const strHeader = renderHeader(rule);
  const strCases = renderCases(rule);
  const strFooter = renderFooter(rule);
  const body = original
    .replace(headerPattern, '')
    .replace(casePattern, '')
    .replace(footerPattern, '');
  const content = `${strHeader}${strCases}${body}${strFooter}\n`;

  fs.writeFileSync(filePath, content);
}
