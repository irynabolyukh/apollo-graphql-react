import { dirname } from 'path';
import { fileURLToPath } from 'url';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
    ...tseslint.configs.recommended,
    js.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    },
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', 'eslint.config.mjs', 'vite.config.ts'],
    },
    {
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
            import: importPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'separate-type-imports',
                },
            ],
            'no-undef': 'off',

            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            'jsx-a11y/anchor-is-valid': [
                'warn',
                {
                    components: ['Link'],
                    specialLink: ['to'],
                },
            ],
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/aria-role': 'error',
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/label-has-associated-control': 'warn',
            'jsx-a11y/no-autofocus': 'warn',

            'import/no-unresolved': 'off',
            'import/no-duplicates': 'error',
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],

            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error', 'debug'],
                },
            ],
            'no-debugger': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
            'eol-last': ['error', 'always'],
            'no-unused-expressions': 'warn',
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'no-trailing-spaces': 'error',
            'no-useless-constructor': 'off',
            'no-loop-func': 'off',

            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    semi: true,
                    trailingComma: 'es5',
                    printWidth: 100,
                    tabWidth: 4,
                    useTabs: false,
                },
            ],
        },
    },
];

export default eslintConfig;
