const HEADER = 68;
const FOOTER = 28;
const PADDING = 16;
const SCALE = 2;

const escapeText = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Standalone SVG can't see the page's CSS, so theme tokens become real colors
const resolveTokens = (markup: string) => {
  const styles = getComputedStyle(document.documentElement);
  return markup.replace(/var\((--[\w-]+)\)/g, (_, token) =>
    styles.getPropertyValue(token).trim()
  );
};

export type TLegendItem = { label: string; slot: number };

const buildLegend = (legend: TLegendItem[]) => {
  let x = PADDING;
  return legend
    .map(({ label, slot }) => {
      const item = `
        <rect x="${x}" y="40" width="12" height="12" rx="3" fill="var(--series-${slot + 1})" />
        <text x="${x + 18}" y="50" font-family="system-ui, sans-serif" font-size="12" fill="var(--ink-2)">${escapeText(label)}</text>`;
      x += 18 + label.length * 7 + 18;
      return item;
    })
    .join('');
};

export const saveChartImage = (
  container: HTMLElement | null,
  title: string,
  legend: TLegendItem[]
) => {
  const chart = container?.querySelector<SVGSVGElement>('svg.recharts-surface');
  if (!chart) return;

  const { width, height } = chart.getBoundingClientRect();
  const fullWidth = width + PADDING * 2;
  const fullHeight = height + HEADER + FOOTER;
  const font = 'font-family="system-ui, sans-serif"';

  const markup = resolveTokens(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${fullWidth}" height="${fullHeight}">
      <rect width="100%" height="100%" fill="var(--surface)" />
      <text x="${PADDING}" y="28" ${font} font-size="16" font-weight="600" fill="var(--ink)">${escapeText(title)}</text>
      ${buildLegend(legend)}
      <g transform="translate(${PADDING} ${HEADER})">${new XMLSerializer().serializeToString(chart)}</g>
      <text x="${PADDING}" y="${fullHeight - 10}" ${font} font-size="12" fill="var(--axis)">Globe Graph · World Bank Open Data</text>
    </svg>`);

  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = fullWidth * SCALE;
    canvas.height = fullHeight * SCALE;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.scale(SCALE, SCALE);
    context.drawImage(image, 0, 0);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${title}.png`;
    link.click();
  };
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
};
