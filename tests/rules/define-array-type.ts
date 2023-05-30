import { TSESLint } from '@typescript-eslint/experimental-utils';
import rule from '../../src/rules/define-array-type';

new TSESLint.RuleTester().run('define-array-type', rule, {
  valid: ['var foo = 1;'],
  invalid: [
    {
      code: 'var example = 1;',
      errors: [{ messageId: 'define-array-type' }],
    },
  ],
});
