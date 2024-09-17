import { Share2 } from 'lucide-react';
import React from 'react';
import { createShareLink, TShareLink } from '@/utils';

const Share: React.FC<TShareLink> = (props) => {
  return (
    <Share2
      onClick={() => {
        const url = createShareLink(props);
        navigator.clipboard.writeText(url);
        alert('Copied to clipboard');
      }}
      className="mt-[2px] md:mt-1"
      cursor="pointer"
    />
  );
};

export default Share;
