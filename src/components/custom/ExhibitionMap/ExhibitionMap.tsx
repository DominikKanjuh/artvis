import { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Exhibition, ProcessedData } from "lib/data";

interface ExhibitionMapProps {
  data: ProcessedData;
  selectedYear: number;
}

function ExhibitionMap({ data, selectedYear }: ExhibitionMapProps) {
  const filteredExhibitions = useMemo(() => {
    return data.exhibitions.filter(
      (exhibition) => exhibition.year === selectedYear,
    ) as Exhibition[];
  }, [data.exhibitions, selectedYear]);

  const getArtistsForExhibition = (exhibitionId: string) => {
    const artistConnections = data.connections
      .filter((conn) => conn.exhibitionId === exhibitionId)
      .map((conn) => {
        const artist = data.artists.find((a) => a.artistId === conn.artistId);
        return artist;
      })
      .filter(
        (artist): artist is NonNullable<typeof artist> => artist !== undefined,
      );

    return artistConnections;
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Legend */}
      <div className="absolute right-4 top-4 z-[900] rounded bg-white p-2 opacity-80 shadow">
        <div className="mb-1 text-base font-semibold">Exhibition Types:</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500 opacity-60"></div>
            <span className="text-base">Group</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500 opacity-60"></div>
            <span className="text-base">Auction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500 opacity-60"></div>
            <span className="text-base">Solo</span>
          </div>
        </div>
      </div>

      {filteredExhibitions.map((exhibition) => (
        <CircleMarker
          key={exhibition.exhibitionId}
          center={[exhibition.latitude, exhibition.longitude]}
          radius={8}
          pathOptions={{
            color:
              exhibition.type === "group"
                ? "red"
                : exhibition.type === "auction"
                  ? "green"
                  : "blue",
            opacity: 1,
            fillOpacity: 0.6,
            weight: 1,
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{exhibition.title}</h3>
              <p className="text-sm">{exhibition.venue}</p>
              <p className="text-sm">
                {exhibition.city}, {exhibition.country}
              </p>
              <h4 className="mt-2 font-semibold">Artists:</h4>
              <ul className="max-h-40 overflow-y-auto text-sm">
                {getArtistsForExhibition(exhibition.exhibitionId).map(
                  (artist) => (
                    <li key={artist.artistId}>{artist.name}</li>
                  ),
                )}
              </ul>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

export default ExhibitionMap;
