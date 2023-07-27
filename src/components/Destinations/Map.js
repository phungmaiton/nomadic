import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import React, { useEffect, useState } from "react";
Geocode.setApiKey("AIzaSyAN_Pb8XbXRMZcpXQXax9GIyIfo0f5odgM");

function Map({ address }) {
  const containerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "10px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAN_Pb8XbXRMZcpXQXax9GIyIfo0f5odgM",
  });

  const [map, setMap] = React.useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenter({ lat, lng });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [address]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
    if (center) {
      // Center the map on the desired location
      map.panTo(center);

      // Set the desired zoom level (e.g., 5)
      map.setZoom(5);
    }
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!center) {
    return null;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
