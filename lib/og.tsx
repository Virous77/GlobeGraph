import { ImageResponse } from 'next/og';
import { SITE_NAME } from './seo';

export const OG_SIZE = { width: 1200, height: 630 };

export const renderOgImage = (title: string, description: string) =>
  new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#0d0d0d',
        color: '#f0efec',
      }}
    >
      <div style={{ fontSize: 32, color: '#c3c2b7' }}>{SITE_NAME}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ fontSize: 32, color: '#c3c2b7', lineHeight: 1.35 }}>
          {description}
        </div>
      </div>
      <div style={{ fontSize: 26, color: '#a3a29a' }}>
        Source: World Bank Open Data
      </div>
    </div>,
    OG_SIZE
  );
