"use client";

import { Header, Timeline, GeographicHistograms } from "components/custom";

import { useData } from "hooks/useData";
import { useState } from "react";

export default function GeographicTrends() {
  const [selectedYear, setSelectedYear] = useState(1905);
  const { data, isLoading, error } = useData();

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message}</div>;

  return (
    <div className="h-screen bg-latte text-espresso font-serif flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col">
        <div className="flex gap-4 w-full justify-between items-center mb-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-left text-coffee">
            Geographic Exhibition Trends
          </h1>
          <Timeline onYearChange={handleYearChange} />
        </div>
        <div className="flex-1 bg-cream rounded-lg shadow-md p-4">
          <GeographicHistograms data={data} selectedYear={selectedYear} />
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: "ArtVis - Geographic Exhibition Trends",
  description:
    "Journey through the art capitals of the world, from continents to cities and see where masterpieces come alive",
  openGraph: {
    type: "website",
    url: "https://artvis.pages.dev/geographic-trends",
    title: "Chronicles of Creativity: Geographic Trends",
    description:
      "Journey through the art capitals of the world, from continents to cities and see where masterpieces come alive",
    images: ["https://images.metmuseum.org/CRDImages/ep/original/DP346474.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronicles of Creativity: Geographic Trends",
    description:
      "Journey through the art capitals of the world, from continents to cities and see where masterpieces come alive",
    images: ["https://images.metmuseum.org/CRDImages/ep/original/DP346474.jpg"],
  },
};
