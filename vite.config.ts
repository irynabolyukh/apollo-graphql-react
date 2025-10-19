import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    [
                        'babel-plugin-styled-components',
                        {
                            displayName: true,
                            fileName: true,
                            ssr: false,
                            minify: true,
                            transpileTemplateLiterals: true,
                            pure: true,
                        },
                    ],
                ],
            },
        }),
    ],
    optimizeDeps: {
        include: ['@apollo/client', '@apollo/client/react', 'graphql', 'rxjs', 'styled-components'],
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
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
                    'apollo-vendor': ['@apollo/client', 'graphql'],
                    'router-vendor': ['react-router', 'react-router-dom'],
                    'styled-vendor': ['styled-components'],
                    'sanitize-vendor': ['dompurify'],
                },
            },
        },
    },
    esbuild: {
        // drop: ['console', 'debugger'],
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
