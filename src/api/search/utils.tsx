import { Addresses } from "models/Adress";
import { Coordinates, Point } from "models/Map";
import { People, SearchForm } from "models/Search";

export const formatAddresses = (addresses: Addresses) => {
  if (!addresses || addresses?.features?.length < 1) {
    return [];
  }
  return addresses.features.map((address) => ({
    coordinates: address.geometry.coordinates.reverse() as Coordinates,
    label: address.properties.label,
  }));
};

const genderWord = (word: string, gender: "M" | "F") => {
  if (gender === "M") return word;
  return `${word}e`;
};

export const formatPeople = (persons: People["persons"]): Point[] => {
  if (!persons || persons?.length < 1) {
    return [];
  }
  const formattedPersons = persons.map((person) => ({
    lat: person.death.location?.latitude,
    lng: person.death.location?.longitude,
    name: `${person.name.first.join(" ")} ${person.name.last} (${
      person.death.age
    } ans)`,
    birth: `${genderWord("Né", person.sex)} à ${
      person.birth.location.city
    } en ${Number(person.source) - person.death.age}`,
    death: `${genderWord("Décédé", person.sex)} à ${
      person.death.location.city
    } en ${person.source}`,
  }));
  return formattedPersons.filter((person) => person.lat && person.lng);
};

export const geoLocate = async (): Promise<{
  coordinates: Coordinates;
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
        coordinates: [position.coords.latitude, position.coords.longitude],
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
      deathGeoPoint: `{"latitude": ${coordinates[0]}, "longitude": ${coordinates[1]}, "distance": "${distance}km"}`,
    };
    return new URLSearchParams(Object.entries(geoData)).toString();
  }
  return `firstName=${firstName}&lastName=${lastName})`;
};

const MAX_RESULTS_PER_PAGE = 20;

export const getPages = (total = 0) => {
  return Math.floor(total / MAX_RESULTS_PER_PAGE);
};
