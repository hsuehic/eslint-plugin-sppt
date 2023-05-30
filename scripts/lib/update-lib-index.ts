import fs from 'fs';
import path from 'path';
import { ESLint } from 'eslint';
import { rules } from './rules';

const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, $1) => {
    return $1.toUpperCase();
  });
};

const filePath = path.resolve(__dirname, '../../src/index.ts');
const rawContent = `/* DON'T EDIT THIS FILE. This is generated by 'scripts/lib/update-lib-index.ts' */

import recommended from './configs/recommended';
${rules.map((rule) => {
  return `import ${camelize(rule.name)} from './rules/${rule.name}';`;
})}

export = {
  configs: {
    recommended,
  },
  rules: {
    ${rules
      .map((rule) => `"${rule.name}": ${camelize(rule.name)}`)
      .join(',\n    ')}
  },
};
`;

const engine = new ESLint({ fix: true });
const lintResult = engine.lintText(rawContent, { filePath });
lintResult.then((results) => {
  const content = results[0].output || rawContent;
  fs.writeFileSync(filePath, content);
});
