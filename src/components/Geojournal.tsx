// @todo: marker popup contains unuseful information
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import SearchControl from "./SearchControl";
import customIconUrl from "../assets/pin.png";
import TripDetails from "./TripDetails";
import useTripStore from "../store";
import { useState, useEffect } from "react";

const position = [35.7010286, 51.3889488];

const newCustomIcon = L.icon({
  iconUrl: customIconUrl,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

function MapClickHandler({ onMapClick }: { onMapClick: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });

  return null;
}

function Geojournal() {
  const { trips, setTrips } = useTripStore((state) => state);
  const [selectedTripIndex, setSelectedTripIndex] = useState<number>(-1);

  const handleClick = (latlng: L.LatLng) => {
    const filteredTrips = trips.filter((trip) => trip.title !== "" && trip.description !== "" && trip.rating !== 0);
    setTrips(filteredTrips);
    setTrips([
      ...filteredTrips,
      { title: "", description: "", rating: 0, marker: [latlng.lat, latlng.lng] },
    ]);
  };

  const handleRemoveTrip = (indexToRemove: number) => {
    setTrips(trips.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    setSelectedTripIndex(trips.length - 1);
  }, [trips]);

  return (
    <div>
      <div className="flex">
        <div className="w-1/4 bg-blue-200 h-screen">
          <TripDetails
            selectedTripIndex={selectedTripIndex ?? -1}
            setSelectedTripIndexIndex={setSelectedTripIndex}
          />
        </div>
        <div className="w-3/4 bg-red-200 h-screen">
          <MapContainer center={position as L.LatLngExpression} zoom={16}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {trips?.map((trip, index) => (
              <Marker
                key={index}
                position={trip.marker}
                icon={newCustomIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedTripIndex(index);
                  },
                }}
              >
                <Popup>
                  Marker Position: <br />
                  Lat: {trip.marker[0].toFixed(4)}, Lng: {trip.marker[1].toFixed(4)}
                  <br />
                  <button
                    className="bg-red-500 text-white rounded-md px-2 py-1 cursor-pointer mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTrip(index);
                    }}
                  >
                    Remove Marker
                  </button>
                </Popup>
              </Marker>
            ))}
            <SearchControl />
            <MapClickHandler onMapClick={handleClick} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Geojournal;
