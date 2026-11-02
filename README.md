# Globe Graph

Compare up to 5 countries across 30 World Bank statistics, from GDP and population to CO2 and life expectancy. See the trend, the ranking and the full data table, then share any view with a link.

Live at [globe-graph.vercel.app](https://globe-graph.vercel.app). Data comes from [World Bank Open Data](https://data.worldbank.org/) (CC BY 4.0).

## Getting started

Use the Node version in `.nvmrc` and [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/Virous77/GlobeGraph.git
cd GlobeGraph
nvm use
pnpm install
pnpm dev
```

The app runs at [localhost:3000](http://localhost:3000).

## Scripts

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start the development server         |
| `pnpm build`    | Build for production                 |
| `pnpm start`    | Run the production build             |
| `pnpm lint`     | Run ESLint                           |
| `pnpm security` | Scan for malware and audit packages  |

## Dependencies

`pnpm-workspace.yaml` skips package versions published in the last 15 days and blocks install scripts.
