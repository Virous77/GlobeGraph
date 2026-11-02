export type TMetricGroup =
  'economy' | 'finance' | 'people' | 'health' | 'environment';
export type TMetricFormat = 'usd' | 'percent' | 'years' | 'count' | 'index';

export type TMetric = {
  slug: string;
  key: string;
  indicator: string;
  group: TMetricGroup;
  format: TMetricFormat;
  // Amounts start the axis at zero. Rates can go negative, so they fit the data.
  zeroBased: boolean;
  // Surveyed every few years: dots mark real observations
  sparse?: boolean;
};

export const FIRST_YEAR = 1960;

export const METRICS: TMetric[] = [
  {
    slug: 'gdp',
    key: 'gdp',
    indicator: 'NY.GDP.MKTP.CD',
    group: 'economy',
    format: 'usd',
    zeroBased: true,
  },
  {
    slug: 'per-capita-income',
    key: 'perCapitaIncome',
    indicator: 'NY.GDP.PCAP.CD',
    group: 'economy',
    format: 'usd',
    zeroBased: true,
  },
  {
    slug: 'inflation',
    key: 'inflation',
    indicator: 'FP.CPI.TOTL.ZG',
    group: 'economy',
    format: 'percent',
    zeroBased: false,
  },
  {
    slug: 'unemployment-labor-force',
    key: 'unemploymentLaborForce',
    indicator: 'SL.UEM.TOTL.ZS',
    group: 'economy',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'debt',
    key: 'debt',
    indicator: 'GC.DOD.TOTL.GD.ZS',
    group: 'finance',
    format: 'percent',
    zeroBased: true,
    sparse: true,
  },
  {
    slug: 'foreign-reserve',
    key: 'foreignReserve',
    indicator: 'FI.RES.TOTL.CD',
    group: 'finance',
    format: 'usd',
    zeroBased: true,
  },
  {
    slug: 'fdi-inflows',
    key: 'fdiInflows',
    indicator: 'BX.KLT.DINV.CD.WD',
    group: 'finance',
    format: 'usd',
    zeroBased: false,
  },
  {
    slug: 'fdi',
    key: 'fdi',
    indicator: 'BX.KLT.DINV.WD.GD.ZS',
    group: 'finance',
    format: 'percent',
    zeroBased: false,
  },
  {
    slug: 'population',
    key: 'population',
    indicator: 'SP.POP.TOTL',
    group: 'people',
    format: 'count',
    zeroBased: true,
  },
  {
    slug: 'life-expectancy',
    key: 'lifeExpectancy',
    indicator: 'SP.DYN.LE00.IN',
    group: 'health',
    format: 'years',
    zeroBased: false,
  },
  {
    slug: 'internet-users',
    key: 'internetUsers',
    indicator: 'IT.NET.USER.ZS',
    group: 'people',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'poverty-level',
    key: 'povertyLevel',
    indicator: 'SI.POV.DDAY',
    group: 'people',
    format: 'percent',
    zeroBased: true,
    sparse: true,
  },
  {
    slug: 'income-inequality',
    key: 'incomeInequality',
    indicator: 'SI.POV.GINI',
    group: 'people',
    format: 'index',
    zeroBased: false,
    sparse: true,
  },
  {
    slug: 'gdp-growth',
    key: 'gdpGrowth',
    indicator: 'NY.GDP.MKTP.KD.ZG',
    group: 'economy',
    format: 'percent',
    zeroBased: false,
  },
  {
    slug: 'manufacturing',
    key: 'manufacturing',
    indicator: 'NV.IND.MANF.ZS',
    group: 'economy',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'exports',
    key: 'exports',
    indicator: 'NE.EXP.GNFS.ZS',
    group: 'finance',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'imports',
    key: 'imports',
    indicator: 'NE.IMP.GNFS.ZS',
    group: 'finance',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'remittances',
    key: 'remittances',
    indicator: 'BX.TRF.PWKR.DT.GD.ZS',
    group: 'finance',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'military-spending',
    key: 'militarySpending',
    indicator: 'MS.MIL.XPND.GD.ZS',
    group: 'finance',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'population-growth',
    key: 'populationGrowth',
    indicator: 'SP.POP.GROW',
    group: 'people',
    format: 'percent',
    zeroBased: false,
  },
  {
    slug: 'urban-population',
    key: 'urbanPopulation',
    indicator: 'SP.URB.TOTL.IN.ZS',
    group: 'people',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'fertility-rate',
    key: 'fertilityRate',
    indicator: 'SP.DYN.TFRT.IN',
    group: 'people',
    format: 'index',
    zeroBased: true,
  },
  {
    slug: 'female-labor-force',
    key: 'femaleLaborForce',
    indicator: 'SL.TLF.CACT.FE.ZS',
    group: 'people',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'infant-mortality',
    key: 'infantMortality',
    indicator: 'SP.DYN.IMRT.IN',
    group: 'health',
    format: 'index',
    zeroBased: true,
  },
  {
    slug: 'health-spending',
    key: 'healthSpending',
    indicator: 'SH.XPD.CHEX.GD.ZS',
    group: 'health',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'education-spending',
    key: 'educationSpending',
    indicator: 'SE.XPD.TOTL.GD.ZS',
    group: 'health',
    format: 'percent',
    zeroBased: true,
    sparse: true,
  },
  {
    slug: 'co2-emissions',
    key: 'co2Emissions',
    indicator: 'EN.GHG.CO2.PC.CE.AR5',
    group: 'environment',
    format: 'index',
    zeroBased: true,
  },
  {
    slug: 'renewable-energy',
    key: 'renewableEnergy',
    indicator: 'EG.FEC.RNEW.ZS',
    group: 'environment',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'electricity-access',
    key: 'electricityAccess',
    indicator: 'EG.ELC.ACCS.ZS',
    group: 'environment',
    format: 'percent',
    zeroBased: true,
  },
  {
    slug: 'forest-area',
    key: 'forestArea',
    indicator: 'AG.LND.FRST.ZS',
    group: 'environment',
    format: 'percent',
    zeroBased: true,
  },
];

export const METRIC_GROUPS: TMetricGroup[] = [
  'economy',
  'finance',
  'people',
  'health',
  'environment',
];

export const DEFAULT_METRIC = METRICS[0];

export const getMetric = (slug: string) =>
  METRICS.find((metric) => metric.slug === slug);

export const getMetricByIndicator = (indicator: string) =>
  METRICS.find(
    (metric) => metric.indicator.toLowerCase() === indicator.toLowerCase()
  );
