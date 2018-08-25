module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/essential'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'indent': [
      'error',
      2,
      {
          SwitchCase: 1,
          flatTernaryExpressions: true
      }
  ],
  'no-undef-init': 1,
  'no-trailing-spaces': 0,
  'no-undefined': 0,
  'no-void': 0,
  'no-unused-vars': 0,
  'no-param-reassign': 0,
  "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "always"
  }],
  }
}
