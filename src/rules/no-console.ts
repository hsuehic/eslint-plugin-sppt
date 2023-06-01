import { AST_NODE_TYPES, TSESLint } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'no-console', []> = {
  meta: {
    docs: {
      description: 'Disallow console expressions',

      // @ts-expect-error
      category: 'Best Practices',

      recommended: 'error',
      url: 'https://git.garena.com/shopee/promotion/promotion-fe/technique-proposal/promotion-fe-lint/-/blob/master/packages/eslint-plugin-sppt/docs/rules/no-console.md',
    },

    fixable: 'code',
    messages: {
      'no-console': 'No console expressions are allowed',
    },
    schema: [],

    type: 'suggestion',
  },
  create(context) {
    const sourceCode = context.getSourceCode();
    return {
      ExpressionStatement(node) {
        if (node.expression.type === AST_NODE_TYPES.CallExpression) {
          if (node.expression.callee.type === AST_NODE_TYPES.MemberExpression) {
            if (
              sourceCode.getText(node.expression.callee.object) === 'console'
            ) {
              context.report({
                node,
                messageId: 'no-console',
                fix(fixer) {
                  return fixer.remove(node);
                },
              });
            }
          }
        }
      },
    };
  },
};

export = rule;
