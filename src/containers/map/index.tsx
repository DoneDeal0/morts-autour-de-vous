import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Icon, Marker, Circle, LatLngBounds, Popup } from "leaflet";
import useMap from "./useMap";
import { Coordinates, Points } from "models/Map";
import "leaflet/dist/leaflet.css";
import "./style.css";
import { Color } from "components/theme";
import "overlapping-marker-spiderfier-leaflet/dist/oms";

declare global {
  interface Window {
    OverlappingMarkerSpiderfier: (map, options) => void;
  }
}

type MapProps = {
  coordinates: Coordinates;
  points: Points;
};

const URL_MARKER_DEFAULT =
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg";

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -30],
});

export default function Map({ coordinates, points }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, coordinates);

  useLayoutEffect(() => {
    if (map && points.length > 0) {
      const circle = new Circle(coordinates, {
        color: Color.blue,
        fillColor: Color.blue_half,
        fillOpacity: 0.1,
        radius: 5000, // in meters
      });
      circle.addTo(map);
    }
  }, [coordinates, map, points.length]);

  useEffect(() => {
    if (map && points.length > 0) {
      const popup = new Popup();
      const oms = new window.OverlappingMarkerSpiderfier(map, {
        keepSpiderfied: true,
        legWeight: 3,
        legColors: { usual: "transparent", highlighted: "transparent" },
      });
      const bounds = new LatLngBounds([]); // displays the relevant portion of the map
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
          .addTo(map);
        oms.addMarker(marker);
        oms.addListener("click", (omsMarker) => {
          popup.setContent(omsMarker._popup._content);
          popup.setLatLng(omsMarker.getLatLng());
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, points, coordinates]);

  return <div style={{ height: "90vh" }} ref={mapRef} />;
}
