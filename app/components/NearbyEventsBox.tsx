'use client'

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const events = [
  {
    id: 1,
    title: "Tech meetup",
    location: "Brno",
    lat: 49.1951,
    lng: 16.6068,
  },
];

export default function nearbyEvents() {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden">
      <MapContainer
        center={[49.1951, 16.6068]}
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {events.map((event) => (
          <Marker key={event.id} position={[event.lat, event.lng]}>
            <Popup>
              <div>
                <h3 className="font-bold">{event.title}</h3>
                <p>{event.location}</p>
                <button>Zobraziť event</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}