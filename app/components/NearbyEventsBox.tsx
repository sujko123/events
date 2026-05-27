'use client'

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEvents } from "@/app/hooks/useEvents";

const {
    data: events = [] as EventItem[],
    isLoading: isLoadingEvents,
    error,
  } = useEvents();

const events = [
  {
    id: 1,
    title: "Tech meetup",
    location: "Brno",
    lat: 49.1951,
    lng: 16.6068,
  },
];

const smallIcon = L.divIcon({
  className: "!bg-transparent",
  html: '<span class="block w-3 h-3 rounded-full bg-rose-600 ring-2 ring-white shadow-sm" aria-hidden="true"></span>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  popupAnchor: [0, -8],
});

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
          <Marker key={event.id} position={[event.lat, event.lng]} icon={smallIcon}>
            <Popup className="!p-2" minWidth={0} maxWidth={200}>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">{event.title}</h3>
                <p className="text-xs text-gray-600">{event.location}</p>
                <button className="text-xs text-rose-600 font-medium">Zobraziť event</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}