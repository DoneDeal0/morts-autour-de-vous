import React, { useRef, useEffect, useState } from "react";
import { Icon, Marker, Circle, LatLngBounds } from "leaflet";
import useMap from "./useMap";
import { Coordinates, Points } from "models/Map";
import "leaflet/dist/leaflet.css";
import "./style.css";
import { Color } from "components/theme";

export const URL_MARKER_DEFAULT =
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg";

export const URL_MARKER_CURRENT =
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg";

type MapProps = {
  coordinates: Coordinates;
  points: Points;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [20, 20],
  iconAnchor: [20, 40],
  popupAnchor: [-9, -30],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [20, 20],
  iconAnchor: [20, 40],
  popupAnchor: [-9, -30],
});

export default function Map({ coordinates, points }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, coordinates);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    if (map) {
      const bounds = new LatLngBounds([]); // displays the relevant portion of the map
      const circle = new Circle(coordinates, {
        color: Color.blue,
        fillColor: Color.blue_half,
        fillOpacity: 0.1,
        radius: 5000, // in meters
      });
      circle.addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng,
        });
        bounds.extend([point.lat, point.lng]);
        marker
          .setIcon(
            selectedPoint && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .bindPopup(point.title)
          .openPopup()
          .addTo(map);
      });
      map.fitBounds(bounds);
    }
  }, [map, points, selectedPoint, coordinates]);

  return <div style={{ height: "100vh" }} ref={mapRef} />;
}
