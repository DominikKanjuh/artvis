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
    <div className="bg-cream max-h-[126px] w-full max-w-xl rounded-lg p-4 shadow-md">
      <h2 className="text-coffee mb-4 text-lg font-bold md:text-xl lg:text-2xl">
        Timeline: 1905-1915
      </h2>
      <Slider
        min={1905}
        max={1915}
        step={1}
        value={[year]}
        onValueChange={handleYearChange}
        className="[&_[data-orientation=horizontal].bg-primary]:bg-coffee w-full"
      />
      <p className="text-coffee mt-4 text-left text-lg font-semibold sm:text-center">
        Selected Year: {year}
      </p>
    </div>
  );
}

export default Timeline;
