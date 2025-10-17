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
