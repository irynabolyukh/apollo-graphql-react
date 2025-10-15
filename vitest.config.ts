import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
        },
        include: ['**/*.{test,spec}.{ts,tsx}'],
        exclude: ['node_modules', 'build', 'dist', '.react-router/types/**'],
        root: __dirname,
    },
});
