/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from 'fs';
import path from 'path';

import { pluginId } from './plugin-id';

const rootDir = path.resolve(__dirname, '../../src/rules/');

export type RuleInfo = {
  filePath: string;
  id: string;
  name: string;
  category: string;
  description: string;
  recommended: boolean;
  deprecated: boolean;
  fixable: boolean;
  replacedBy: string[];
  messages: Record<string, string>;
};

export type CategoryInfo = {
  id: string;
  rules: RuleInfo[];
};

export const rules: RuleInfo[] = fs
  .readdirSync(rootDir)
  .sort()
  .map((filename): RuleInfo => {
    const filePath = path.join(rootDir, filename);
    const name = filename.slice(0, -3);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const rule = require(filePath);
    const { meta } = rule.default || rule;

    return {
      filePath,
      id: `${pluginId}/${name}`,
      name,
      deprecated: Boolean(meta.deprecated),
      fixable: Boolean(meta.fixable),
      replacedBy: [],
      ...meta.docs,
      messages: meta.messages,
    } satisfies RuleInfo;
  });

export const categories: CategoryInfo[] = [
  'Possible Errors',
  'Best Practices',
  'Stylistic Issues',
].map(
  (id): CategoryInfo => ({
    id,
    rules: rules.filter((rule) => rule.category === id && !rule.deprecated),
  })
);
