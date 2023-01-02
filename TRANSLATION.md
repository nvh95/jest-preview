# Translation Contributing

## How

We use [docusaurus](https://docusaurus.io/) to build our document. See [Docusaurus I18n Guide](https://docusaurus.io/docs/i18n/introduction)

## Add a new language (Optional)

### Add dropdown item in navbar

Open site config: `/website/docusaurus.config.js`. Add new language in `i18n.locales`.

### Initialize language folder

In `/website`

```sh
npm run write-translations -- --locale <language>
```

This will create the preset files by docusaurus in `/website/i18n/<language>`.

## Translate

### Start the site

In `/website`

```sh
npm run start -- --locale <language>
```

> **Note**
>
> - Each locale is a distinct standalone single-page application: it is not possible to start the Docusaurus sites in all locales at the same time.
> - The static files may not be shown. Don't worry about that. It works fine in production.

### Homepage

Modify `/website/i18n/<language>/code.json` where id start with `home.`

### Footer and navbar

Modify files in `/website/i18n/<language>/docusaurus-theme-classic`

### Docs

1. Modify `/website/i18n/<language>/docusaurus-plugin-content-docs/current.json` for directory title.
2. Copy your docs Markdown files from `docs/` to `/website/i18n/<language>/docusaurus-plugin-content-docs/current`, and translate them.

### Blog

No translation needed for now :P
