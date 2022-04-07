import React, { useRef, useEffect, useMemo } from "react";
import { LatLngBounds } from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "./style.css";
import { Coordinates, Points } from "models/Map";
import useMap from "./useMap";
import MarkerPoint from "./marker-point";

declare global {
  interface Window {
    L: any;
  }
}

type MapProps = {
  coordinates: Coordinates;
  points: Points;
  showCircle: boolean;
  searchRadius: number;
};

export default function Map({
  coordinates,
  points,
  showCircle,
  searchRadius,
}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, coordinates, showCircle, searchRadius);

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
        const marker = new MarkerPoint(point);
        if (point.lat && point.lng) {
          bounds.extend([point.lat, point.lng]);
        }
        marker.generate();
        marker.addToCluster(markersCluster);
      });
      map.fitBounds(bounds);
      markersCluster.addTo(map);
    }
  }, [map, points, coordinates, markersCluster]);

  return <div style={{ height: "90vh" }} ref={mapRef} />;
}
