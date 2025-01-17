"use client";

import { Header, Timeline } from "components/custom";
import { useData } from "hooks/useData";
import { useState } from "react";
import dynamic from "next/dynamic";

const ConnectionGraph = dynamic(
  () => import("components/custom/ConnectionGraph/ConnectionGraph"),
  { ssr: false }
);

export default function ArtistConnections() {
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
        <title>ArtVis - Artist-Exhibition Connections</title>
        <meta
          name="description"
          content="Trace the intricate web of artists and their legendary exhibitions through time"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://artvis.pages.dev/artist-connections"
        />
        <meta
          property="og:title"
          content="Threads of Genius: Artist-Exhibition Connections"
        />
        <meta
          property="og:description"
          content="Trace the intricate web of artists and their legendary exhibitions through time"
        />
        <meta
          property="og:image"
          content="https://images.metmuseum.org/CRDImages/ep/original/DT1947.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Threads of Genius: Artist-Exhibition Connections"
        />
        <meta
          name="twitter:description"
          content="Trace the intricate web of artists and their legendary exhibitions through time"
        />
        <meta
          name="twitter:image"
          content="https://images.metmuseum.org/CRDImages/ep/original/DT1947.jpg"
        />
      </head>
      <div className="h-screen bg-latte text-espresso font-serif flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-4 flex flex-col">
          <div className="flex gap-4 w-full justify-between items-center mb-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-left lg:text-center text-coffee">
              Artist-Exhibition Connections
            </h1>
            <Timeline onYearChange={handleYearChange} />
          </div>
          <div className="flex-1 bg-cream rounded-lg shadow-md p-4">
            <ConnectionGraph data={data} selectedYear={selectedYear} />
          </div>
        </main>
      </div>
    </>
  );
}
