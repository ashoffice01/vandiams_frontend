import { Suspense } from "react";
import DiamondDetailsClient from "./DiamondDetailsClient";

function ProductSkeleton() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Image Skeleton */}
        <div className="bg-gray-200 aspect-square rounded-xl" />

        {/* Content Skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-12 bg-gray-200 rounded w-full mt-6" />
          <div className="space-y-3 mt-8">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>

      </div>
    </main>
  );
}

export default function Page() {
  return (
     <Suspense fallback={<ProductSkeleton />}>
      <DiamondDetailsClient />
    </Suspense>
  );
}