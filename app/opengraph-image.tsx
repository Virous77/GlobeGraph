import { OG_SIZE, renderOgImage } from '@/lib/og';
import messages from '@/messages/en.json';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Globe Graph country comparison charts';

const Image = () =>
  renderOgImage('Compare countries in charts', messages.Seo.homeDescription);

export default Image;
