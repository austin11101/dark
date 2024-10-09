import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: -25.746111,
  lng: 28.188056,
};

const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapRef, setMapRef] = useState(null);
  const [searchError, setSearchError] = useState(null); // Error handling state

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  const handleSearch = () => {
    if (!mapRef) return;

    const service = new window.google.maps.places.PlacesService(mapRef);
    const request = {
      query: searchQuery,
      fields: ['name', 'geometry'],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const place = results[0];
        setSelectedPlace(place.geometry.location);
        mapRef.panTo(place.geometry.location);
        setSearchError(null); // Reset error if successful
      } else {
        console.error('Place search error:', status);
        setSearchError('No results found. Please try another search.'); // Set error message
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a location"
        style={{ width: '300px', padding: '10px', margin: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px' }}>Search</button>

      {searchError && <p style={{ color: 'red' }}>{searchError}</p>} {/* Display search error */}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12} // Set zoom level here
        center={center} // Use Pretoria coordinates
        onLoad={(map) => setMapRef(map)}
      >
        {selectedPlace && <Marker position={selectedPlace} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
