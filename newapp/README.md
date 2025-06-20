# improwised-new-website

## 🔮 Astro + Astro Svelte + Shadcn Svelte + Tailwind CSS

## Url :
https://www.improwised.com/


## Development Prospective

> 🔹**Node js 22.13.1**
> 🔹[Astro - 5.4.0](https://astro.build/)
> 🔹[Astro Svelte - 7.0.5](https://docs.astro.build/en/guides/integrations-guide/svelte/)
> 🔹[Shadcn Svelte](https://www.shadcn-svelte.com/docs/installation/astro)
> 🔹[Tailwind CSS - 4.0.0](https://docs.astro.build/en/guides/integrations-guide/tailwind/)


## 🚀 Steps

### Git Repo clone


```bash
git clone git@github.com:Improwised/improwised-new-website.git
cd newapp
```

### Environment

* copy `.env.example` to `.env`. (skip if already done)


```bash
$ cp .env.example .env
```

### Modify astro.config.mjs for development

* Since the project is served under a subdirectory, uncomment and set the following in your astro.config.mjs

```
base: '/improwised-new-website/newapp',

server: {
    host: true,
    port: 4321
}
```

⚠️ Important: Before pushing any changes to the repository, comment the above base and server configuration.

### Developing
Installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

### Building

To create a production version of your app:

```sh
npm run build
```

### Preview

You can preview the production build with `npm run preview`.

##  Build your new application with above Tech Stack

Please follow the `tech.md`

