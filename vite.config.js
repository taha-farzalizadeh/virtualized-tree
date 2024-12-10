import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'VirtualizedTree',
            fileName: (format) => `virtualized-tree.${format}.js`,
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            input: './src/index.ts',
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        tsconfig: './tsconfig.json'
    },
});
