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

type PersonLocation = {
  city: string;
  code: string;
  codeHistory: string;
  codePostal: [string];
  counter: string;
  countryCode: string;
  departmentCode: string;
  latitude: number;
  longitude: number;
};

type Person = {
  birth: {
    date: string;
    location: PersonLocation;
  };
  death: {
    age: number;
    certificateId: string;
    date: string;
    location: PersonLocation;
  };
  id: string;
  name: {
    first: string[];
    last: string;
  };
  score: number;
  scores: {
    name: {
      score: number;
      first: number;
      last: number;
    };
    score: number;
    es: number;
  };
  sex: "M" | "F";
  source: string;
  sourceLine: number;
};

export interface People {
  delay: number;
  maxScoresES: number;
  page: number;
  persons: Person[];
  size: number;
  total: number;
}
