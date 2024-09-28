import { Share2, X } from 'lucide-react';
import React from 'react';
import { createShareLink, TShareLink } from '@/utils';
import { toast } from 'sonner';

const Share: React.FC<TShareLink> = (props) => {
  return (
    <Share2
      onClick={() => {
        const url = createShareLink(props);
        navigator.clipboard.writeText(url);
        toast.success('Link Copied to clipboard', {
          action: (
            <X
              onClick={() => toast.dismiss()}
              cursor="pointer"
              size={18}
              className="absolute right-2 top-[33%]"
            />
          ),
        });
      }}
      className="custom-hide mt-[2px] md:mt-1"
      cursor="pointer"
    />
  );
};

export default Share;
