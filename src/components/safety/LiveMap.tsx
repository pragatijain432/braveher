import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LiveMapProps {
  height?: string;
  showSafeZones?: boolean;
}

export const LiveMap = ({ height = "500px", showSafeZones = true }: LiveMapProps) => {
  const [position, setPosition] = useState<[number, number]>([28.6139, 77.209]);
  const [located, setLocated] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLocated(true);
        },
        () => setLocated(true),
      );
    } else {
      setLocated(true);
    }
  }, []);

  const safeZones = [
    { lat: position[0] + 0.005, lng: position[1] + 0.003, name: "Police Station", type: "police" },
    { lat: position[0] - 0.004, lng: position[1] + 0.006, name: "City Hospital", type: "hospital" },
    { lat: position[0] + 0.003, lng: position[1] - 0.005, name: "Women's Help Center", type: "help" },
  ];

  return (
    <div className="rounded-3xl overflow-hidden border border-border shadow-soft" style={{ height }}>
      {located && (
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
          <Circle center={position} radius={120} pathOptions={{ color: "hsl(320 75% 45%)", fillColor: "hsl(320 75% 45%)", fillOpacity: 0.15 }} />
          {showSafeZones &&
            safeZones.map((z) => (
              <Marker key={z.name} position={[z.lat, z.lng]}>
                <Popup>
                  <strong>{z.name}</strong>
                  <br />
                  <span style={{ textTransform: "capitalize" }}>{z.type}</span>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </div>
  );
};
