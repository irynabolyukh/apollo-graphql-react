import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const GITHUB_API_URL = process.env.VITE_GITHUB_API_URL || 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
    throw new Error('VITE_GITHUB_TOKEN is required for GraphQL code generation');
}

const config: CodegenConfig = {
    schema: [
        {
            [GITHUB_API_URL]: {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                },
            },
        },
    ],
    documents: [
        'src/entities/**/api/**/*.ts',
        'src/features/**/api/**/*.ts',
        'src/pages/**/*.tsx',
    ],
    generates: {
        './src/graphql/generated.ts': {
            plugins: ['typescript', 'typescript-operations'],
            config: {
                skipTypename: false,
                enumsAsTypes: true,
                avoidOptionals: false,
                maybeValue: 'T | null | undefined',
                scalars: {
                    DateTime: 'string',
                    URI: 'string',
                    HTML: 'string',
                    GitObjectID: 'string',
                    GitTimestamp: 'string',
                    Date: 'string',
                },
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
