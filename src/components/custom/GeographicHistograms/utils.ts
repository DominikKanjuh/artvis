import { Exhibition } from "lib/data";

export function getCountryData(
  exhibitions: Exhibition[],
  selectedContinent: string,
) {
  if (!selectedContinent) return [];

  const countryCount = exhibitions
    .filter((e) => e.continent === selectedContinent)
    .filter((e) => e.country && e.country !== "-" && e.country !== "Unknown")
    .reduce(
      (acc, exhibition) => {
        acc[exhibition.country] = (acc[exhibition.country] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  return Object.entries(countryCount)
    .map(([country, count]) => ({
      label: country,
      value: count,
    }))
    .sort((a, b) => b.value - a.value);
}

export function getCityData(
  exhibitions: Exhibition[],
  selectedCountry: string,
) {
  if (!selectedCountry) return [];

  const cityCount = exhibitions
    .filter((e) => e.country === selectedCountry)
    .filter((e) => e.city && e.city !== "-" && e.city !== "Unknown")
    .reduce(
      (acc, exhibition) => {
        acc[exhibition.city] = (acc[exhibition.city] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  return Object.entries(cityCount)
    .map(([city, count]) => ({
      label: city,
      value: count,
    }))
    .sort((a, b) => b.value - a.value);
}

export function getExhibitionData(
  exhibitions: Exhibition[],
  selectedCity: string,
) {
  if (!selectedCity) return [];

  return exhibitions
    .filter((e) => e.city === selectedCity)
    .filter((e) => e.title && e.title !== "-" && e.title !== "Unknown")
    .map((exhibition) => ({
      label: exhibition.title,
      value: exhibition.numberOfPaintings,
    }))
    .sort((a, b) => b.value - a.value);
}
