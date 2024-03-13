// vitest.config.ts
import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            provider: 'v8', // or 'v8'
            reporter: ['text', 'html', 'clover', 'json'],
        },
        exclude:[
            ...configDefaults.exclude, 
            "./src/old code/**"
          ]
    },
})