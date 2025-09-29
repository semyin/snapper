Generated with [vike.dev/new](https://vike.dev/new) ([version 476](https://www.npmjs.com/package/create-vike/v/0.0.476)) using this command:

```sh
npm create vike@latest --- --react --hono --drizzle --google-analytics --cloudflare --eslint --sentry
```

## Contents

* [*Cloudflare D1*](#cloudflare-d1)

  * [Setup](#setup)

* [*Drizzle*](#drizzle)

* [React](#react)

  * [`/pages/+config.ts`](#pagesconfigts)
  * [Routing](#routing)
  * [`/pages/_error/+Page.jsx`](#pages_errorpagejsx)
  * [`/pages/+onPageTransitionStart.ts` and `/pages/+onPageTransitionEnd.ts`](#pagesonpagetransitionstartts-and-pagesonpagetransitionendts)
  * [SSR](#ssr)
  * [HTML Streaming](#html-streaming)

* [Sentry Browser / Error Tracking & Performance Monitoring](#sentry-browser--error-tracking--performance-monitoring)

## *Cloudflare D1*

### Setup

Create a D1 database with the following command:

```sh
wrangler d1 create <your-db-name>
```

Then, copy the output to `wrangler.toml`.

Finally, update the `d1:migrate` script (in `package.json`) to replace `YOUR_DATABASE_NAME`, and execute it.

> \[!NOTE]
> For reference, a good database name is:
>
> * Typically a combination of ASCII characters, shorter than 32 characters, and uses dashes (-) instead of spaces.
> * Descriptive of the use-case and environment. For example, “staging-db-web” or “production-db-backend”.
> * Only used for describing the database, and is not directly referenced in code.

## *Drizzle*

First, ensure that `DATABASE_URL` is configured in `.env` file, then create the database:

```bash
pnpm drizzle:generate # a script that executes drizzle-kit generate.
pnpm drizzle:migrate # a script that executes drizzle-kit migrate.
```

> \[!NOTE]
> The `drizzle-kit generate` command is used to generate SQL migration files based on your Drizzle schema.
>
> The `drizzle-kit migrate` command is used to apply the generated migrations to your database.

Read more on [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview)

## React

This app is ready to start. It's powered by [Vike](https://vike.dev) and [React](https://react.dev/learn).

### `/pages/+config.ts`

Such `+` files are [the interface](https://vike.dev/config) between Vike and your code. It defines:

* A default [`<Layout>` component](https://vike.dev/Layout) (that wraps your [`<Page>` components](https://vike.dev/Page)).
* A default [`title`](https://vike.dev/title).
* Global [`<head>` tags](https://vike.dev/head-tags).

### Routing

[Vike's built-in router](https://vike.dev/routing) lets you choose between:

* [Filesystem Routing](https://vike.dev/filesystem-routing) (the URL of a page is determined based on where its `+Page.jsx` file is located on the filesystem)
* [Route Strings](https://vike.dev/route-string)
* [Route Functions](https://vike.dev/route-function)

### `/pages/_error/+Page.jsx`

The [error page](https://vike.dev/error-page) which is rendered when errors occur.

### `/pages/+onPageTransitionStart.ts` and `/pages/+onPageTransitionEnd.ts`

The [`onPageTransitionStart()` hook](https://vike.dev/onPageTransitionStart), together with [`onPageTransitionEnd()`](https://vike.dev/onPageTransitionEnd), enables you to implement page transition animations.

### SSR

SSR is enabled by default. You can [disable it](https://vike.dev/ssr) for all your pages or only for some pages.

### HTML Streaming

You can enable/disable [HTML streaming](https://vike.dev/stream) for all your pages, or only for some pages while still using it for others.

## Sentry Browser / Error Tracking & Performance Monitoring

This app is integrated with [Sentry](https://sentry.io) for error tracking.

Add your Sentry DSN to `.env` file.
You can configure [Sentry for the browser](https://docs.sentry.io/platforms/javascript/guides/react/) in `sentry.browser.config.ts`.

Upload of source maps to Sentry is handled by the [`sentryVitePlugin`](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/) in `vite.config.ts`.
You have to configure `SENTRY_ORG`, `SENTRY_PROJECT` and `SENTRY_AUTH_TOKEN` in the `.env.sentry-build-plugin` file with the values from your Sentry account.

> \[!NOTE]
> Sentry Error Tracking is **only activated in production** (`import.meta.env.PROD === true`)!

**Testing Sentry** receiving Errors:

1. Build & Start the app `pnpm build && pnpm preview`.
2. open Testpage in browser: http://localhost:3000/sentry.
3. check your [Sentry Dashboard](https://sentry.io) for new Errors.

