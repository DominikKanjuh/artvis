"use client";

import { Skeleton } from "components/components/ui/skeleton";
import { Header, Timeline, TimelineSkeleton } from "components/custom";
import { useData } from "hooks/useData";
import { useState } from "react";
import dynamic from "next/dynamic";

const ExhibitionMap = dynamic(
  () => import("components/custom/ExhibitionMap/ExhibitionMap"),
  { ssr: false },
);

export default function GlobalExhibitions() {
  const [selectedYear, setSelectedYear] = useState(1905);
  const { data, isLoading, error } = useData();

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  if (isLoading) {
    return (
      <div className="bg-latte text-espresso flex h-screen flex-col font-serif">
        <Header />
        <main className="container mx-auto flex flex-1 flex-col px-4 py-4">
          <div className="mb-4 flex w-full items-center justify-between gap-4">
            <Skeleton>
              <h1 className="text-coffee text-left text-xl font-bold opacity-0 md:text-2xl lg:text-center lg:text-3xl">
                Global Exhibitions Map
              </h1>
            </Skeleton>
            <TimelineSkeleton />
          </div>
          <div className="bg-cream flex-1 rounded-lg p-2 shadow-md">
            <Skeleton className="h-full w-full" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-latte text-espresso bg-cream flex h-screen flex-col items-center justify-center rounded-lg p-6 text-center font-serif shadow-md">
        <h2 className="text-espresso mb-4 text-2xl font-bold">
          Oops! Something went wrong.
        </h2>
        <p className="text-espresso text-lg">
          {error?.message || "Error no data"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-latte text-espresso flex h-screen flex-col font-serif">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col px-4 py-4">
        <div className="mb-4 flex w-full items-center justify-between gap-4">
          <h1 className="text-coffee text-left text-xl font-bold md:text-2xl lg:text-center lg:text-3xl">
            Global Exhibitions Map
          </h1>
          <Timeline onYearChange={handleYearChange} />
        </div>
        <div className="bg-cream flex-1 rounded-lg p-2 shadow-md">
          <ExhibitionMap data={data} selectedYear={selectedYear} />
        </div>
      </main>
    </div>
  );
}
