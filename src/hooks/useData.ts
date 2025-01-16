import { useQuery } from "@tanstack/react-query";
import type { ProcessedData } from "lib/data";

async function fetchData(): Promise<ProcessedData> {
  const response = await fetch("/api/data");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export function useData() {
  return useQuery({
    queryKey: ["artData"],
    queryFn: fetchData,
  });
}
