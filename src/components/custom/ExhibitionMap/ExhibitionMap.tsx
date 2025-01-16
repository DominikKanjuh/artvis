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
      (exhibition) => exhibition.year === selectedYear
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
        (artist): artist is NonNullable<typeof artist> => artist !== undefined
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
      <div className="absolute top-4 right-4 bg-white p-2 rounded shadow z-[1000] opacity-80">
        <div className="text-sm font-semibold mb-1">Exhibition Types:</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
            <span className="text-sm">Group</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-60"></div>
            <span className="text-sm">Auction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 opacity-60"></div>
            <span className="text-sm">Solo</span>
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
              <h4 className="font-semibold mt-2">Artists:</h4>
              <ul className="text-sm max-h-40 overflow-y-auto">
                {getArtistsForExhibition(exhibition.exhibitionId).map(
                  (artist) => (
                    <li key={artist.artistId}>{artist.name}</li>
                  )
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
