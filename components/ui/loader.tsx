export const Loader = ({ type = "normal" }: { type?: "full" | "normal" }) => {
  if (type === "normal") return <BounceLoader />;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
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
