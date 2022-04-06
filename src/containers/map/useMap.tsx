import {
  useEffect,
  useState,
  MutableRefObject,
  useLayoutEffect,
  useMemo,
} from "react";
import { Circle, Map, TileLayer } from "leaflet";
import { Coordinates } from "models/Map";
import Color from "components/theme/colors";

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  coordinates: Coordinates,
  showCircle: boolean
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  const circleArea = useMemo(
    () =>
      new Circle(coordinates, {
        color: Color.blue,
        fillColor: Color.blue_half,
        fillOpacity: 0.1,
        radius: 5000, // in meters
      }),
    []
  );

  useLayoutEffect(() => {
    if (map) {
      if (showCircle) {
        circleArea.setLatLng(coordinates);
        circleArea.addTo(map);
      } else {
        circleArea.remove();
      }
    }
  }, [map, showCircle]);

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
