"use client";

import { Skeleton } from "components/components/ui/skeleton";
import { Header, Timeline, TimelineSkeleton } from "components/custom";
import { useData } from "hooks/useData";
import { useState } from "react";
import dynamic from "next/dynamic";

const ExhibitionMap = dynamic(
  () => import("components/custom/ExhibitionMap/ExhibitionMap"),
  { ssr: false }
);

export default function GlobalExhibitions() {
  const [selectedYear, setSelectedYear] = useState(1905);
  const { data, isLoading, error } = useData();

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-latte text-espresso font-serif flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-4 flex flex-col">
          <div className="flex gap-4 w-full justify-between items-center mb-4">
            <Skeleton>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-left lg:text-center text-coffee opacity-0">
                Global Exhibitions Map
              </h1>
            </Skeleton>
            <TimelineSkeleton />
          </div>
          <div className="p-2 flex-1 bg-cream rounded-lg shadow-md">
            <Skeleton className="h-full w-full" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen bg-latte text-espresso font-serif flex flex-col items-center justify-center text-center bg-cream p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-espresso mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-espresso text-lg">
          {error?.message || "Error no data"}
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-latte text-espresso font-serif flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col">
        <div className="flex gap-4 w-full justify-between items-center mb-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-left lg:text-center text-coffee">
            Global Exhibitions Map
          </h1>
          <Timeline onYearChange={handleYearChange} />
        </div>
        <div className="p-2 flex-1 bg-cream rounded-lg shadow-md">
          <ExhibitionMap data={data} selectedYear={selectedYear} />
        </div>
      </main>
    </div>
  );
}
