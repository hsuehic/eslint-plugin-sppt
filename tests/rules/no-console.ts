import { TSESLint } from '@typescript-eslint/utils';
import rule from '../../src/rules/no-console';

export const cases = {
  valid: [
    'count(1);',
    'error(1);',
    'info(1)',
    'log(1);',
    'profile(1);',
    'time(1);',
    'timeEnd(1);',
    'timeStart(1);',
  ],
  invalid: [
    {
      code: 'console.count(1);',
      errors: [{ messageId: 'no-console' }],
      output: '',
    },
    {
      code: 'console.error(1);',
      errors: [{ messageId: 'no-console' }],
      output: '',
    },
    {
      code: 'console.info(1);',
      errors: [{ messageId: 'no-console' }],
      output: '',
    },
    {
      code: 'console.profile(1);',
      errors: [{ messageId: 'no-console' }],
      output: '',
    },
    {
      code: 'console.time(1);',
      errors: [{ messageId: 'no-console' }],
      output: '',
    },
    {
      code: 'console.timeEnd(1);',
      errors: [{ messageId: 'no-console' }],
      output: '',
    },
    {
      code: 'console.timeStart(1);',
      errors: [{ messageId: 'no-console' }],
      output: '',
    },
  ],
} as const satisfies TSESLint.RunTests<'no-console', []>;

new TSESLint.RuleTester().run('no-console', rule, cases);
