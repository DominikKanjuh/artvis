import Papa from "papaparse";

export type Exhibition = {
  exhibitionId: string;
  title: string;
  year: number;
  city: string;
  country: string;
  continent: string;
  venue: string;
  startDate?: string;
  type: "group" | "solo" | "auction";
  numberOfPaintings: number;
  latitude: number;
  longitude: number;
};

export type Artist = {
  artistId: string;
  name: string;
  birthYear?: number;
  deathYear?: number;
  nationality?: string;
  gender?: "M" | "F";
  birthplace?: string;
  deathplace?: string;
};

export type ArtistExhibition = {
  artistId: string;
  exhibitionId: string;
};

export type ProcessedData = {
  exhibitions: Exhibition[];
  artists: Artist[];
  connections: ArtistExhibition[];
};

let processedData: ProcessedData | null = null;

function getContinent(country: string): string {
  const continentMap: Record<string, string> = {
    // Europe
    GB: "Europe", // United Kingdom
    NL: "Europe", // Netherlands
    DE: "Europe", // Germany
    RU: "Europe", // Russia
    UA: "Europe", // Ukraine
    CH: "Europe", // Switzerland
    HU: "Europe", // Hungary
    AT: "Europe", // Austria
    LV: "Europe", // Latvia
    FR: "Europe", // France
    BE: "Europe", // Belgium
    CZ: "Europe", // Czech Republic
    IT: "Europe", // Italy
    LT: "Europe", // Lithuania
    ES: "Europe", // Spain
    SE: "Europe", // Sweden
    PL: "Europe", // Poland
    NO: "Europe", // Norway

    // Asia
    JP: "Asia", // Japan

    // North America
    US: "North America", // United States

    // Unknown
    "\\N": "Unknown",

    default: "Europe",
  };

  return continentMap[country] || continentMap.default;
}

const getCountryName = (country: string): string => {
  const countryMap: Record<string, string> = {
    GB: "United Kingdom",
    NL: "Netherlands",
    DE: "Germany",
    RU: "Russia",
    UA: "Ukraine",
    CH: "Switzerland",
    HU: "Hungary",
    AT: "Austria",
    LV: "Latvia",
    FR: "France",
    BE: "Belgium",
    CZ: "Czech Republic",
    IT: "Italy",
    LT: "Lithuania",
    ES: "Spain",
    SE: "Sweden",
    PL: "Poland",
    NO: "Norway",
    JP: "Japan",
    US: "United States",
    "\\N": "Unknown",
    default: "Unknown",
  };

  return countryMap[country] || countryMap.default;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function loadAndProcessData(): Promise<ProcessedData> {
  if (processedData) return processedData;

  const response = await fetch(`${baseUrl}/data/artvis.csv`);
  const fileContent = await response.text();

  const { data: records } = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  const uniqueCountries = new Set<string>();

  records.forEach((record: any) => {
    if (record["e.country"]) {
      uniqueCountries.add(record["e.country"]);
    }
  });

  const exhibitions = new Map<string, Exhibition>();
  const artists = new Map<string, Artist>();
  const connectionsSet = new Set<string>();
  const connections: ArtistExhibition[] = [];

  records.forEach((record: any) => {
    if (!exhibitions.has(record["e.id"])) {
      const countryCode = record["e.country"];
      exhibitions.set(record["e.id"], {
        exhibitionId: record["e.id"],
        title: record["e.title"],
        year: parseInt(record["e.startdate"]),
        city: record["e.city"],
        country: getCountryName(countryCode),
        continent: getContinent(countryCode),
        venue: record["e.venue"],
        type: record["e.type"] as Exhibition["type"],
        numberOfPaintings: parseInt(record["e.paintings"]),
        latitude: parseFloat(record["e.latitude"]),
        longitude: parseFloat(record["e.longitude"]),
        startDate: record["e.startdate"],
      });
    }

    if (!artists.has(record["a.id"])) {
      const birthYear = record["a.birthdate"]
        ? parseInt(record["a.birthdate"].split("-")[0])
        : undefined;

      const deathYear = record["a.deathdate"]
        ? parseInt(record["a.deathdate"].split("-")[0])
        : undefined;

      artists.set(record["a.id"], {
        artistId: record["a.id"],
        name: `${record["a.firstname"]} ${record["a.lastname"]}`.trim(),
        birthYear,
        deathYear,
        nationality:
          record["a.nationality"] !== "\\N"
            ? record["a.nationality"]
            : undefined,
        gender: record["a.gender"] as Artist["gender"],
        birthplace:
          record["a.birthplace"] !== "\\N" ? record["a.birthplace"] : undefined,
        deathplace:
          record["a.deathplace"] !== "\\N" ? record["a.deathplace"] : undefined,
      });
    }

    // Create a unique key for the connection
    const connectionKey = `${record["a.id"]}-${record["e.id"]}`;

    if (!connectionsSet.has(connectionKey)) {
      connectionsSet.add(connectionKey);
      connections.push({
        artistId: record["a.id"],
        exhibitionId: record["e.id"],
      });
    }
  });

  processedData = {
    exhibitions: Array.from(exhibitions.values()),
    artists: Array.from(artists.values()),
    connections,
  };

  return processedData;
}
