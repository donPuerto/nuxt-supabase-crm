import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.js'],
  rules: {
    // General code style rules
    // These rules enforce consistent coding styles and formatting
    'semi': ['error', 'always'], // Require semicolons at the end of statements
    'quotes': ['error', 'single'], // Use single quotes for strings
    'indent': ['error', 2], // Use 2 spaces for indentation
    'comma-dangle': ['error', 'always-multiline'], // Require trailing commas in multiline object/array literals
    'object-curly-spacing': ['error', 'always'], // Require spaces inside curly braces
    'array-bracket-spacing': ['error', 'never'], // Disallow spaces inside array brackets
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }], // Consistent spacing before function parentheses
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // Limit consecutive empty lines
    'eol-last': ['error', 'always'], // Require newline at the end of files

    // Enforces a specific order of component tags: <script>, then <template>, then <style>
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style'],
    }],
    // Enforces consistent indentation in <template> (2 spaces)
    'vue/html-indent': ['error', 2],
    // Disables the rule that bans certain types in TypeScript
    '@typescript-eslint/ban-types': 'off',
    // Controls line breaks before tag's closing brackets
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always',
    }],
    // Requires consistent spacing before tag's closing brackets
    'vue/html-closing-bracket-spacing': 'error',
    // Disables the rule that warns against using v-html
    'vue/no-v-html': 'off',
    // Disables the rule that disallows explicit 'any' types
    '@typescript-eslint/no-explicit-any': 'off',
    // Enforces self-closing on HTML elements
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always',
      },
    }],
    // Limits the maximum number of attributes allowed per line
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: 1,
    }],
    // Disables the rule requiring multi-word component names
    'vue/multi-word-component-names': 'off',
    // Disables the rule requiring default values for props
    'vue/require-default-prop': 'off',
    // Disables the rule disallowing empty object types in TypeScript
    '@typescript-eslint/no-empty-object-type': 'off',
  },
  ignores: ['.nuxt', 'node_modules'],
})
