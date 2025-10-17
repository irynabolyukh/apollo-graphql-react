import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: CodegenConfig = {
    schema: [
        {
            'https://api.github.com/graphql': {
                headers: {
                    Authorization: `Bearer ${process.env.VITE_GITHUB_TOKEN}`,
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

