import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['@apollo/client', '@apollo/client/react', 'graphql', 'rxjs'],
        esbuildOptions: {
            target: 'es2020',
        },
    },
    build: {
        cssCodeSplit: true,
        cssMinify: 'esbuild',
        target: 'es2020',
        modulePreload: { polyfill: false },
        sourcemap: false,
        minify: 'esbuild',
        reportCompressedSize: false,
    },
    esbuild: {
        drop: ['console', 'debugger'],
        legalComments: 'none',
        jsx: 'automatic',
    },
    preview: {
        port: 5000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        open: true,
        port: 3000,
    },
});
