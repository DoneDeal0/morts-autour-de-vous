import { AddressSuggestion } from "./Adress";
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
  searchPeople: () => {
    onSearch: (form: SearchForm) => Promise<any>;
    people: any;
    error: string;
    loading: boolean;
  };
}
