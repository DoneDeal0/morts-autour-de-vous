import { api } from "api/config";

const searchAddress = async (address: string) => {
  try {
    const query = encodeURIComponent(address);
    const res = await api.get(
      `https://api-adresse.data.gouv.fr/search/?q=${query}&limit=15&autocomplete=1`
    );
    if (res.status === 204) {
      throw new Error("pas de résultats");
    }
    return res.data.partner;
  } catch (err) {
    throw new Error("pas de résultats");
  }
};

export const router = {
  searchAddress,
};
