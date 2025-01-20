const babelParser = require('@babel/eslint-parser');
const eslintPluginReact = require('eslint-plugin-react');

module.exports = [
    {
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                babelOptions: {
                    configFile: './.babelrc', // Ensure it points to the correct Babel config file
                },
            },
        },
        plugins: {
            react: eslintPluginReact,
        },
        rules: {
            'semi': ['error', 'always'],
        },
    },
];
