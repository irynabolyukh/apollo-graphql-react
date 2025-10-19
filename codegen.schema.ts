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
    generates: {
        './src/graphql/schema.graphql': {
            plugins: ['schema-ast'],
            config: {
                includeDirectives: true,
            },
        },
    },
};

export default config;

