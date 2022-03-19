export type ITab = "geo" | "name";

export interface SearchForm {
  firstName: string;
  lastName: string;
  distance: number;
  coordinates: [number, number];
  page?: number;
  tab?: ITab;
}
