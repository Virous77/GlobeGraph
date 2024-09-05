export const Loader = ({ type = 'normal' }: { type?: 'full' | 'normal' }) => {
  if (type === 'normal') return <BounceLoader />;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <BounceLoader />
    </div>
  );
};

const BounceLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-4 w-4 animate-bounce rounded-full bg-foreground [animation-delay:-0.3s]" />
      <div className="h-4 w-4 animate-bounce rounded-full bg-foreground [animation-delay:-0.13s]" />
      <div className="h-4 w-4 animate-bounce rounded-full bg-foreground" />
    </div>
  );
};
