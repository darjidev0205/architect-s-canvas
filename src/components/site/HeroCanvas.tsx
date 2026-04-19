import { Suspense, lazy } from "react";

const Scene = lazy(() => import("./HeroScene"));

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={<div className="absolute inset-0 grid-bg" />}>
        <Scene />
      </Suspense>
    </div>
  );
}
