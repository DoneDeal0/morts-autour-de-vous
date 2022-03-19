export interface SearchApi {
  searchAddress: (
    address: string
  ) => { addresses: any; error: string; loading: boolean };
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
