// drizzle.remote.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './database/drizzle/schema/*', // 指定你的 schema 文件路径
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    // 你的 Cloudflare 账户信息
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: 'f05bcc9e-52ab-485c-a3a0-87f2a472a7c1', // 你的线上 D1 数据库 ID
    token: process.env.CLOUDFLARE_D1_API_TOKEN!,
  },
});
