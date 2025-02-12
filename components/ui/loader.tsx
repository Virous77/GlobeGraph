import { cn } from '@/lib/utils';

export const Loader = ({
  type = 'normal',
  isFetching = false,
}: {
  type?: 'full' | 'normal';
  isFetching?: boolean;
}) => {
  if (type === 'normal') return <BounceLoader />;

  return (
    <div
      className={cn(
        'bg-opacity-50 fixed top-0 left-0 z-102 flex h-full w-full items-center justify-center',
        isFetching ? '' : 'bg-black'
      )}
    >
      <BounceLoader />
    </div>
  );
};

const BounceLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="bg-foreground h-4 w-4 animate-bounce rounded-full [animation-delay:-0.3s]" />
      <div className="bg-foreground h-4 w-4 animate-bounce rounded-full [animation-delay:-0.13s]" />
      <div className="bg-foreground h-4 w-4 animate-bounce rounded-full" />
    </div>
  );
};
