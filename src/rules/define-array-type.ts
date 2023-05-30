import { TSESLint } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'define-array-type', []> = {
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Enforce type anotation for array declaration.',
      suggestion: true,
      recommended: 'warn',
      url: 'https://github.com/hsuehic/eslint-plugin-sppt/blob/main/docs/rules/define-array-type.md',
    },
    messages: {
      'define-array-type': "'example' identifier is forbidden.",
    },
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    return {
      "Identifier[name='example']"(node) {
        context.report({
          node,
          messageId: 'define-array-type',
        });
      },
    };
  },
};

export = rule;
