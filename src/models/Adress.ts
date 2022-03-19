export interface Addresses {
  attribution: string;
  features: {
    type: string;
    geometry: { type: "Point"; coordinates: [number, number] };
    properties: { label: string; score: number };
  }[];
  licence: string;
  limit: number;
  query: string;
  type: string;
  version: string;
}

export interface AddressSuggestion {
  coordinates: [number, number];
  label: string;
}
