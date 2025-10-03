import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L from 'leaflet';
import SearchControl from './SearchControl';
import customIconUrl from '../assets/pin.png'; 

const position = [35.7010286, 51.3889488];

const newCustomIcon = L.icon({
  iconUrl: customIconUrl,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });

  return null;
}

function Geojournal() {
  const [markers, setMarkers] = useState([]);

  const handleClick = (latlng) => {
    setMarkers(prevMarkers => [...prevMarkers, latlng]);
  }
  
  const handleRemoveMarker = (indexToRemove) => {
    setMarkers(prevMarkers => prevMarkers.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/4 bg-blue-200 h-screen">
          <h1>Form</h1>
        </div>
        <div className="w-3/4 bg-red-200 h-screen">
          <MapContainer center={position} zoom={16}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        
            {markers.map((marker, index) => (
              <Marker key={index} position={marker} icon={newCustomIcon}> 
                <Popup>
                  Marker Position: <br />
                  Lat: {marker.lat.toFixed(4)}, Lng: {marker.lng.toFixed(4)}
                  <br />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleRemoveMarker(index);
                    }}
                    style={{
                      marginTop: '10px',
                      padding: '5px 10px',
                      color: 'white',
                      backgroundColor: 'red',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer'
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