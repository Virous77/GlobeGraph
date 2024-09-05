# Globe Graph

This app let you explore different type of countries data like `GDP`, `Population`, `Income` and `Life Expectancy` in a multiple charts.

## Clone the repository

```bash
git clone https://github.com/Virous77/GlobeGraph.git
# or
gh repo clone Virous77/GlobeGraph
```

## Install the dependencies

It's recommended to use give node version in `.nvmrc` file.

```bash
nvm use
```

Install the dependencies using `pnpm` or `yarn`.

```bash
pnpm install
# or
yarn install
```

## Start the development server

```bash
pnpm dev
```

## Build the app

```bash
pnpm build
```

I have added `Dockerfile` for both development and production environment.

## Start the app in development environment

```bash
docker build -t globe-graph-dev -f Dockerfile.dev .
```

## Start the app in production environment

```bash
docker build -t globe-graph -f Dockerfile.prod .
```