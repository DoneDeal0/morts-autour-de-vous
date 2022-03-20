import { AddressSuggestion } from "./Adress";
import { Point } from "./Map";
import { SearchForm } from "./Search";

export interface SearchApi {
  getGeoLocation: () => {
    onGeolocate: () => Promise<{ coordinates: [number, number] }>;
    isGeolocating: boolean;
    geoError: string;
    geoReset: () => void;
  };
  searchAddress: (
    address: string
  ) => { addresses: AddressSuggestion[]; error: string; loading: boolean };
  searchPeople: (
    form: SearchForm,
    allowSearch: boolean
  ) => {
    total: number;
    people: Point[];
    error: string;
    loading: boolean;
  };
}
