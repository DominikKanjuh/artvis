"use client";

import { Header, Timeline } from "components/custom";
import { useData } from "hooks/useData";
import { useState } from "react";

export default function GlobalExhibitions() {
  const [selectedYear, setSelectedYear] = useState(1905);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // Here you would typically update your visualization based on the new year
  };

  const { data, isLoading, error } = useData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div className="min-h-screen bg-latte text-espresso font-serif">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-3xl font-bold text-left lg:text-center text-coffee">
            Global Exhibitions Map
          </h1>
          <Timeline onYearChange={handleYearChange} />
        </div>
        <div className="mt-6 p-4 bg-cream rounded-lg shadow-md">
          {/* Your visualization component would go here */}
        </div>
      </main>
    </div>
  );
}
