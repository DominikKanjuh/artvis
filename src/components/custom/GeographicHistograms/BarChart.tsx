"use client";

import { useEffect, useRef, useState } from "react";

interface BarChartProps {
  data: { label: string; value: number }[];
}

export function BarChart({ data }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && !maxHeight) {
      const height = chartRef.current.offsetHeight;
      console.log(height);
      setMaxHeight(height);
    }
  }, [maxHeight]);

  console.log(maxHeight);

  return (
    <div
      className="h-full space-y-2 p-4 overflow-y-auto bg-white rounded-lg shadow overflow-hidden "
      style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
      ref={chartRef}
    >
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-coffee rounded-full h-2"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
