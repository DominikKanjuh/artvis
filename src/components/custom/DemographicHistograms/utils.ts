import { Artist } from "lib/data";

export function getNationalityData(artists: Artist[]) {
  const nationalityCounts = new Map<string, number>();

  artists.forEach((artist) => {
    if (artist.nationality) {
      nationalityCounts.set(
        artist.nationality,
        (nationalityCounts.get(artist.nationality) || 0) + 1
      );
    }
  });

  return Array.from(nationalityCounts.entries())
    .map(([nationality, count]) => ({
      label: nationality,
      value: count,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 15); // Show top 15 nationalities
}

export function prepareGenderData(data: { label: string; value: number }[]) {
  const defaultData = [
    { label: "Male", value: 0 },
    { label: "Female", value: 0 },
  ];

  data.forEach((item) => {
    const index = defaultData.findIndex((d) => d.label === item.label);
    if (index !== -1) {
      defaultData[index].value = item.value;
    }
  });

  return defaultData;
}

export function getGenderDistribution(artists: Artist[]) {
  const genderCounts = new Map<string, number>();

  if (artists.length > 0) {
    genderCounts.set("Male", 0);
    genderCounts.set("Female", 0);
  }

  artists.forEach((artist) => {
    if (artist.gender) {
      const genderLabel = artist.gender === "M" ? "Male" : "Female";
      genderCounts.set(genderLabel, (genderCounts.get(genderLabel) || 0) + 1);
    }
  });

  return Array.from(genderCounts.entries()).map(([gender, count]) => ({
    label: gender,
    value: count,
  }));
}

export function getLifespanDistribution(artists: Artist[]) {
  const lifespans = artists
    .filter((artist) => artist.birthYear && artist.deathYear)
    .map((artist) => artist.deathYear! - artist.birthYear!);

  const binSize = 10;
  const bins = new Map<string, number>();

  lifespans.forEach((lifespan) => {
    const binStart = Math.floor(lifespan / binSize) * binSize;
    const binLabel = `${binStart}-${binStart + binSize}`;
    bins.set(binLabel, (bins.get(binLabel) || 0) + 1);
  });

  return Array.from(bins.entries())
    .map(([range, count]) => ({
      label: range,
      value: count,
    }))
    .sort((a, b) => {
      const aStart = parseInt(a.label.split("-")[0]);
      const bStart = parseInt(b.label.split("-")[0]);
      return aStart - bStart;
    });
}
