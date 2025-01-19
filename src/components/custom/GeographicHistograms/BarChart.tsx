"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface BarChartProps {
  data: { label: string; value: number }[];
  horizontal?: boolean;
  customColors?: Record<string, string>;
}

export function BarChart({
  data,
  horizontal = true,
  customColors,
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (chartRef.current && !maxHeight) {
      const height = chartRef.current.offsetHeight;
      setMaxHeight(height);
    }
  }, [maxHeight]);

  return (
    <div
      className="h-full space-y-2 overflow-y-auto rounded-lg bg-white p-4 shadow"
      style={{
        maxHeight: !isMobile && maxHeight ? `${maxHeight}px` : undefined,
      }}
      ref={chartRef}
    >
      {horizontal ? (
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <motion.div
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor:
                      customColors?.[item.label] || "rgb(75, 57, 48)",
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(item.value / maxValue) * 100}%`,
                  }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col justify-end">
          <div className="flex flex-1 items-end gap-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex h-full flex-1 flex-col items-center"
              >
                <div className="flex h-full w-full flex-col justify-end">
                  <motion.div
                    className="w-full"
                    style={{
                      minHeight: "10px",
                      backgroundColor:
                        customColors?.[item.label] || "rgb(75, 57, 48)",
                    }}
                    initial={{ height: 0 }}
                    animate={{
                      height: `${(item.value / maxValue) * 100}%`,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-around text-sm">
            {data.map((item, index) => (
              <div key={index} className="text-center">
                <div>{item.label}</div>
                <div>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
