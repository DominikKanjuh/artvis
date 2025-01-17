"use client";

import { Header, Timeline } from "components/custom";
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
    // Here you would typically update your visualization based on the new year
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message}</div>;

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

export const metadata = {
  title: "ArtVis - Global Exhibitions Map",
  description:
    "Explore the world's most celebrated exhibitions and uncover their hidden artistic gems",
  openGraph: {
    type: "website",
    url: "https://artvis.pages.dev/global-exhibitions",
    title: "Art Unveiled: Global Exhibitions Map",
    description:
      "Explore the world's most celebrated exhibitions and uncover their hidden artistic gems",
    images: ["https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Unveiled: Global Exhibitions Map",
    description:
      "Explore the world's most celebrated exhibitions and uncover their hidden artistic gems",
    images: ["https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg"],
  },
};
