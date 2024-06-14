"use client";

import React, { useEffect } from "react";

function LocoScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const scroll = new LocomotiveScroll();
    })();
  }, []);
  return <>{children}</>;
}

export default LocoScroll;
