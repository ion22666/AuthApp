/** @type {import('vite').UserConfig} */
export default {
    build: {
        outDir: "dist",
        rollupOptions: {
            input: "src/main.js",
            output: "main.js",
        },
    },
};
