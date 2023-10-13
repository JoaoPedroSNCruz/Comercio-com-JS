import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import { resolve } from "path";

export default defineConfig({
    base: "/<Comercio-com-JS>/",
    plugins: [],
    resolve: {
        /* something */
    },
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },
    build: {
        rollupOptions: {
            input:{
                main: resolve(__dirname, "./index.html"),
                checkout: resolve(__dirname, "./checkout.html"),
                pedidos: resolve(__dirname, "./pedidos.html"),
            },
        },
    },
});