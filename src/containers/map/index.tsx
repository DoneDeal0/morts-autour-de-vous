import React, { useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { Icon, Marker, Circle, LatLngBounds } from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "overlapping-marker-spiderfier-leaflet/dist/oms";
import "./style.css";
import { Coordinates, Points } from "models/Map";
import { Color } from "components/theme";
import useMap from "./useMap";

declare global {
  interface Window {
    L: any;
  }
}

type MapProps = {
  coordinates: Coordinates;
  points: Points;
  showCircle: boolean;
};

const PIN =
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg";

const defaultCustomIcon = new Icon({
  iconUrl: PIN,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -30],
});

export default function Map({ coordinates, points, showCircle }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, coordinates);

  useLayoutEffect(() => {
    if (map && showCircle && points.length > 0) {
      const circle = new Circle(coordinates, {
        color: Color.blue,
        fillColor: Color.blue_half,
        fillOpacity: 0.1,
        radius: 5000, // in meters
      });
      circle.addTo(map);
    }
  }, [coordinates, map, points.length, showCircle]);

  const markersCluster = useMemo(
    () =>
      new window.L.MarkerClusterGroup({
        chunkedLoading: true,
      }),
    []
  );

  useEffect(() => {
    if (map && points.length > 0) {
      const bounds = new LatLngBounds([]); // displays the relevant portion of the map
      markersCluster.clearLayers();
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng,
        });
        if (point.lat && point.lng) {
          bounds.extend([point.lat, point.lng]);
        }
        marker
          .setIcon(defaultCustomIcon)
          .bindPopup(
            `<div style="margin-bottom: 6px;"><strong>${point.name}</strong></div><div>${point.birth}</div><div>${point.death}</div>`
          )
          .on("mouseover", function () {
            this.openPopup();
          })
          .on("mouseout", function () {
            this.closePopup();
          })
          .on("click", function () {
            this.openPopup();
          })
          .addTo(markersCluster);
      });
      map.fitBounds(bounds);
      markersCluster.addTo(map);
    }
  }, [map, points, coordinates, markersCluster]);

  return <div style={{ height: "90vh" }} ref={mapRef} />;
}
