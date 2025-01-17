"use client";

import { Header, Timeline, DemographicHistograms } from "components/custom";
import { useData } from "hooks/useData";
import { useState } from "react";

export default function Demographics() {
  const [selectedYear, setSelectedYear] = useState(1905);
  const { data, isLoading, error } = useData();

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message}</div>;

  return (
    <>
      <head>
        <title>ArtVis - Artist Demographics</title>
        <meta
          name="description"
          content="Discover the lifelines, identities and origins of the artists who shaped history"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://artvis.pages.dev/artist-demographics"
        />
        <meta
          property="og:title"
          content="The Artist's Mosaic: Demographics Revealed"
        />
        <meta
          property="og:description"
          content="Discover the lifelines, identities and origins of the artists who shaped history"
        />
        <meta
          property="og:image"
          content="https://images.metmuseum.org/CRDImages/ep/original/DP-1410-001.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="The Artist's Mosaic: Demographics Revealed"
        />
        <meta
          name="twitter:description"
          content="Discover the lifelines, identities and origins of the artists who shaped history"
        />
        <meta
          name="twitter:image"
          content="https://images.metmuseum.org/CRDImages/ep/original/DP-1410-001.jpg"
        />
      </head>
      <div className="h-screen bg-latte text-espresso font-serif flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-4 flex flex-col">
          <div className="flex gap-4 w-full justify-between items-center mb-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-left lg:text-center text-coffee">
              Artist Demographics
            </h1>
            <Timeline onYearChange={handleYearChange} />
          </div>
          <div className="flex-1 bg-cream rounded-lg shadow-md p-4">
            <DemographicHistograms data={data} selectedYear={selectedYear} />
          </div>
        </main>
      </div>
    </>
  );
}
