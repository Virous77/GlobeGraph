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

Install the dependencies using `pnpm`. It enforces the supply-chain rules in `pnpm-workspace.yaml`: a 15 day release cooldown, patched overrides and no install scripts.

```bash
pnpm install
```

## Security check

Scans the repo for malware and audits the dependencies. CI runs both.

```bash
pnpm security
```

## Start the development server

```bash
pnpm dev
```

## Build the app

```bash
pnpm build
```
