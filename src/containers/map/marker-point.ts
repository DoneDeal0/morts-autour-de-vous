import { Icon, LayerGroup, Marker, MarkerCluster } from "leaflet";
import { DATA } from "assets/data";
import { Point } from "models/Map";

declare global {
  interface Window {
    L: any;
  }
}

const defaultCustomIcon = new Icon({
  iconUrl: DATA.pin,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -30],
});

export default class MarkerPoint {
  marker: Marker;
  point: Point;
  constructor(point: Point) {
    this.marker = new Marker({
      lat: point.lat,
      lng: point.lng,
    });
    this.point = point;
  }
  public generate() {
    this.marker
      .setIcon(defaultCustomIcon)
      .bindPopup(
        `<div style="margin-bottom: 6px;"><strong>${this.point.name}</strong></div><div>${this.point.birth}</div><div>${this.point.death}</div>`,
        { closeButton: false }
      )
      .on("mouseover", function () {
        this.openPopup();
      })
      .on("mouseout", function () {
        this.closePopup();
      })
      .on("click", function () {
        this.openPopup();
      });
  }

  public addToCluster(cluster: LayerGroup<MarkerCluster>) {
    return this.marker.addTo(cluster);
  }
}
