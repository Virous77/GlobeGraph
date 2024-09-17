import ShareComp from '@/components/share';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: '',
    desc: 'Globe Graph is a web app that visualizes the countries data like GDP, GDP per capita, and population in different years using many charts.',
    url: '/share',
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const SharePage = () => {
  return (
    <main>
      <section className="p-1">
        <ShareComp />
      </section>
    </main>
  );
};

export default SharePage;
