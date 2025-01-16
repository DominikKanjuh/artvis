import fs from "fs";
import path from "path";
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

export async function loadAndProcessData(): Promise<ProcessedData> {
  if (processedData) return processedData;

  const filePath = path.join(process.cwd(), "public", "data", "artvis.csv");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data: records } = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  const exhibitions = new Map<string, Exhibition>();
  const artists = new Map<string, Artist>();
  const connectionsSet = new Set<string>();
  const connections: ArtistExhibition[] = [];

  records.forEach((record: any) => {
    if (!record["e.id"] || !record["a.id"]) {
      console.log("record", record);
    }

    if (!exhibitions.has(record["e.id"])) {
      exhibitions.set(record["e.id"], {
        exhibitionId: record["e.id"],
        title: record["e.title"],
        year: parseInt(record["e.startdate"]),
        city: record["e.city"],
        country: record["e.country"],
        continent: "", // To be added later
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
