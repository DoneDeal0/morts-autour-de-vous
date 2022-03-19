import { AddressSuggestion } from "./Adress";

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
  searchPeopleByName: (
    name: string
  ) => {
    people: number;
    error: string;
    loading: boolean;
  };
  searchPeopleByGeolocation: (
    maxDistance: number,
    geolocation: [number, number],
    page: number
  ) => {
    people: any;
    error: string;
    loading: boolean;
  };
}
