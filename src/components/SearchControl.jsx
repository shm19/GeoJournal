// SearchControl.js
import { useState, useRef, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';


function SearchControl() {
  const map = useMap();
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      L.DomEvent.disableClickPropagation(container);
    }

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&bounded=1&limit=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const latLng = [parseFloat(lat), parseFloat(lon)];
        
        map.flyTo(latLng, 16); 
      } else {
        alert('Place not found. Please try another search.');
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      alert('An error occurred while searching.');
    }
  };

  return (
    <div className='z-1000 bg-white rounded-md p-2 shadow-md top-5 left-12 absolute' ref={containerRef}>
      <form onSubmit={handleSubmit} className='z-10'>
        <input
          className='border-none outline-none text-black'
          type="text"
          placeholder="Search for a place..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className='bg-blue-500 text-white rounded-md px-2 py-1 cursor-pointer'>Search</button>
      </form>
    </div>
  );
}

export default SearchControl;
