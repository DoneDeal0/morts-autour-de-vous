import { useEffect, useState, MutableRefObject } from "react";
import { Map, TileLayer } from "leaflet";
import { Coordinates } from "models/Map";

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  coordinates: Coordinates
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: coordinates[0],
          lng: coordinates[1],
        },
        zoom: 10,
      });
      const layer = new TileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );
      instance.addLayer(layer);
      setMap(instance);
    }
  }, [mapRef, map, coordinates]);
  return map;
}
