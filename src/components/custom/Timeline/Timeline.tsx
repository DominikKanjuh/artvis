"use client";

import { Slider } from "components/components/ui/slider";
import { useState } from "react";

interface TimelineProps {
  onYearChange: (year: number) => void;
}

function Timeline({ onYearChange }: TimelineProps) {
  const [year, setYear] = useState(1905);

  const handleYearChange = (value: number[]) => {
    const newYear = value[0];
    setYear(newYear);
    onYearChange(newYear);
  };

  return (
    <div className="w-full max-w-xl p-4 bg-cream rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-coffee mb-4">
        Timeline: 1905-1915
      </h2>
      <Slider
        min={1905}
        max={1915}
        step={1}
        value={[year]}
        onValueChange={handleYearChange}
        className="w-full"
      />
      <p className="text-center text-lg font-semibold text-coffee mt-4">
        Selected Year: {year}
      </p>
    </div>
  );
}

export default Timeline;
