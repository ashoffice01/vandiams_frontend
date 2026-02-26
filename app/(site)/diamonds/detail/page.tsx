import { Suspense } from "react";
import DiamondDetailsClient from "./DiamondDetailsClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <DiamondDetailsClient />
    </Suspense>
  );
}