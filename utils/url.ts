const fs = require('fs');

const highContrastColors = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#800000', // Maroon
  '#808000', // Olive
  '#008000', // Dark Green
  '#800080', // Purple
  '#008080', // Teal
  '#000080', // Navy
  '#FF4500', // Orange Red
  '#2E8B57', // Sea Green
  '#4682B4', // Steel Blue
  '#DAA520', // Goldenrod
  '#FF6347', // Tomato
  '#7FFF00', // Chartreuse
  '#DC143C', // Crimson
  '#00CED1', // Dark Turquoise
  '#FF1493', // Deep Pink
  '#4B0082', // Indigo
  '#FFD700', // Gold
  '#6A5ACD', // Slate Blue
  '#8B0000', // Dark Red
  '#FF8C00', // Dark Orange
  '#32CD32', // Lime Green
  '#4169E1', // Royal Blue
  '#9932CC', // Dark Orchid
  '#00BFFF', // Deep Sky Blue
];

const readPages = fs
  .readdirSync('app/country')
  .map((page: string) => page.replace('.tsx', ''));

const pagePath = 'url.json';

const writeJson = () => {
  fs.writeFileSync(pagePath, '');
  const urls = readPages.map((page: string, idx: number) => {
    const name = page
      .split('-')
      .map((n, idx) => {
        if (idx > 0) {
          return n.charAt(0).toUpperCase() + n.slice(1);
        } else {
          return n;
        }
      })
      .join('');
    const data = {
      href: `/country/${page}`,
      name: name,
      color: highContrastColors[idx],
    };

    return data;
  });

  fs.writeFileSync(pagePath, JSON.stringify(urls, null, 2));
};

writeJson();
