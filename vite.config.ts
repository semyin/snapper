import { pages } from "vike-cloudflare";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import devServer from "@hono/vite-dev-server";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vike(),
    devServer({
      entry: "hono-entry.ts",

      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx|vue)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png)($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],

      injectClientScript: false,
    }),
    react(),
    sentryVitePlugin({
      sourcemaps: {
        disable: false,
      },
    }),
    pages({
      server: {
        kind: "hono",
        entry: "hono-entry.ts",
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ["wrangler"],
    },

    target: "es2022",
    sourcemap: true,
  },
});
