export type Point = {
  name: string;
  birth: string;
  death: string;
  lat: number;
  lng: number;
};

export type Points = Point[];

type Latitude = number;
type Longitude = number;
export type Coordinates = [Latitude, Longitude];
