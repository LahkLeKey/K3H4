import { useLayoutEffect, useRef, useState } from "react";

import { PlotCanvas } from "./plot-canvas";

export function AgricultureDashboard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);


  useLayoutEffect(() => {
    const recompute = () => {
      const top = containerRef.current?.getBoundingClientRect().top ?? 0;
      const padding = 16;
      setViewportHeight(Math.max(360, window.innerHeight - top - padding));
    };
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative isolate w-full overflow-hidden rounded-2xl border bg-white"
      style={viewportHeight ? { height: `${viewportHeight}px`, maxHeight: `${viewportHeight}px` } : undefined}
    >
      <PlotCanvas />
    </div>
  );
}