import { Addresses } from "models/Adress";
import { ITab, SearchForm } from "models/Search";

export const formatAddresses = (addresses: Addresses) => {
  if (!addresses || addresses?.features?.length < 1) {
    return [];
  }
  return addresses.features.map((address) => ({
    coordinates: address.geometry.coordinates,
    label: address.properties.label,
  }));
};

export const geoLocate = async (): Promise<{
  coordinates: [number, number];
}> => {
  return new Promise((resolve, reject) => {
    const { geolocation } = navigator;
    if (!geolocation) reject("geolocation indisponible");
    const handleError = ({ code }) => {
      if (code === 1) reject("permission refusée");
      if (code === 2) reject("geolocation indisponible");
      if (code === 3) reject("geolocation trop lente");
    };
    const handleSuccess = (position) => {
      resolve({
        coordinates: [position.coords.longitude, position.coords.latitude],
      });
    };
    geolocation.getCurrentPosition(handleSuccess, handleError, {
      maximumAge: 10000,
    });
  });
};

export const formatSearchQuery = (form: SearchForm) => {
  const { coordinates, distance, firstName, lastName } = form;
  if (form.tab === "geo") {
    const geoData = {
      deathGeoPoint: `{"latitude": ${coordinates[1]}, "longitude": ${coordinates[0]}, "distance": "${distance}km"}`,
    };
    return new URLSearchParams(Object.entries(geoData)).toString();
  }
  return `firstName=${firstName}&lastName=${lastName})`;
};
