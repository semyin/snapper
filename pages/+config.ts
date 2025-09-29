import type { Config } from "vike/types";
import vikeReact from "vike-react/config";
import vikeCloudflare from 'vike-cloudflare/config'
import Layout from "../layouts/LayoutDefault";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: "My Vike App",
  description: "Demo showcasing Vike",
  server: "hono-entry.ts",
  extends: [vikeReact, vikeCloudflare],
} satisfies Config;
