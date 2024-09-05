"use client";

import { FullLogo } from "@/assets/full-logo";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const AppStart = ({ children }: { children: React.ReactNode }) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <section
      className={cn(
        !mount &&
          "fixed top-0 left-0 w-full h-[100dvh] flex items-center justify-center bg-white"
      )}
    >
      {mount ? children : <FullLogo />}
    </section>
  );
};

export default AppStart;
