import { AddressSuggestion } from "./Adress";
import { Coordinates, Point } from "./Map";
import { SearchForm } from "./Search";

export interface SearchApi {
  getGeoLocation: () => {
    onGeolocate: () => Promise<{ coordinates: Coordinates }>;
    isGeolocating: boolean;
    geoError: string;
    geoReset: () => void;
    isGeoSuccess: boolean;
    geoData: Coordinates;
  };
  searchAddress: (
    address: string
  ) => { addresses: AddressSuggestion[]; error: string; loading: boolean };
  searchPeople: (
    form: SearchForm,
    allowSearch: boolean
  ) => {
    pages: number;
    people: Point[];
    total: number;
    error: string;
    loading: boolean;
  };
}
