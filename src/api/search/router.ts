import { api } from "api/config";
import { Addresses } from "models/Adress";
import { People, SearchForm } from "models/Search";
import { formatSearchQuery } from "./utils";

const searchAddress = async (address: string = ""): Promise<Addresses> => {
  try {
    if (address.length < 3) {
      return null;
    }
    const query = encodeURIComponent(address);
    const res = await api.get(
      `https://api-adresse.data.gouv.fr/search/?q=${query}&limit=5&autocomplete=1`
    );
    if (res.status === 204) {
      throw new Error("Pas de résultats");
    }
    return res.data;
  } catch (err) {
    throw new Error("Une erreur est survenue");
  }
};

const searchPeople = async (form: SearchForm): Promise<People> => {
  try {
    let query = formatSearchQuery(form);
    const res = await api.get(
      `https://deces.matchid.io/deces/api/v1/search?${query}&page=${form.page}&fuzzy=${form.fuzzy}&lastSeenAliveDate=${form.fromYear}`
    );
    if (res.status === 204) {
      throw new Error("Pas de résultats");
    }
    return res.data.response;
  } catch (err) {
    throw new Error("Une erreur est survenue");
  }
};

export const router = {
  searchAddress,
  searchPeople,
};
