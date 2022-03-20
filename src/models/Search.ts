import { Coordinates } from "./Map";
export type ITab = "geo" | "name";

export interface SearchForm {
  firstName: string;
  lastName: string;
  distance: number;
  coordinates: Coordinates;
  page?: number;
  tab?: ITab;
}
