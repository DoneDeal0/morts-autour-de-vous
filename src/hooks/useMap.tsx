import {
  useEffect,
  useState,
  MutableRefObject,
  useLayoutEffect,
  useMemo,
} from "react";
import { Circle, Map, TileLayer } from "leaflet";
import { DATA } from "assets/data";
import { Color } from "components/theme";
import { Coordinates } from "models/Map";

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  coordinates: Coordinates,
  showCircle: boolean,
  searchRadius: number
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  const circleArea = useMemo(
    () =>
      new Circle(coordinates, {
        color: Color.blue,
        fillColor: Color.blue_half,
        fillOpacity: 0.1,
        radius: searchRadius * 1000, // in meters
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useLayoutEffect(() => {
    if (map) {
      if (showCircle) {
        map.removeLayer(circleArea);
        circleArea.setLatLng(coordinates);
        circleArea.setRadius(searchRadius * 1000);
        map.addLayer(circleArea);
      } else {
        map.removeLayer(circleArea);
      }
    }
  }, [map, showCircle, circleArea, coordinates, searchRadius]);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: coordinates[0],
          lng: coordinates[1],
        },
        zoom: 10,
      });
      const layer = new TileLayer(DATA.layer, {
        attribution: DATA.attribution,
      });
      instance.addLayer(layer);
      setMap(instance);
    }
  }, [mapRef, map, coordinates]);

  return map;
}
