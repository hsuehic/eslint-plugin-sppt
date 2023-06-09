import { TSESLint } from '@typescript-eslint/utils';
import rule, { Options } from '../../src/rules/no-console';

const options: Options[] = [{ allowMethods: [] }];

export const cases = {
  valid: [
    {
      code: 'count(1);',
      options,
    },
    {
      code: 'console.count(3);',
      options: [
        {
          allowMethods: ['count'] as string[],
        },
      ],
    },
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
      options,
      output: '',
    },
    {
      code: 'console.error(1);',
      errors: [{ messageId: 'no-console' }],
      options,
      output: '',
    },
    {
      code: 'console.info(1);',
      errors: [{ messageId: 'no-console' }],
      options,
      output: '',
    },
    {
      code: 'console.profile(1);',
      errors: [{ messageId: 'no-console' }],
      options,
      output: '',
    },
    {
      code: 'console.time(1);',
      errors: [{ messageId: 'no-console' }],
      options,
      output: '',
    },
    {
      code: 'console.timeEnd(1);',
      errors: [{ messageId: 'no-console' }],
      options,
      output: '',
    },
    {
      code: 'console.timeStart(1);',
      errors: [{ messageId: 'no-console' }],
      options,
      output: '',
    },
  ],
} as const satisfies TSESLint.RunTests<'no-console', Options[]>;

new TSESLint.RuleTester().run<'no-console', Options[]>(
  'no-console',
  rule,
  cases
);
