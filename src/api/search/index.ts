/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from "react-query";
import { router } from "api/search/router";
import { SearchApi } from "models/Api";
import { formatAddresses, formatPeople, geoLocate } from "./utils";
import { SearchForm } from "models/Search";

export const searchAddress: SearchApi["searchAddress"] = (address: string) => {
  const { data, error, isLoading } = useQuery(["search-address", address], () =>
    router.searchAddress(address)
  );
  return {
    addresses: formatAddresses(data),
    error: error && error["message"],
    loading: isLoading,
  };
};

export const searchPeople: SearchApi["searchPeople"] = (
  form: SearchForm,
  allowSearch: boolean
) => {
  const { data, error, isLoading } = useQuery(
    ["search", form],
    () => router.searchPeople(form),
    { enabled: allowSearch, cacheTime: 3600000, keepPreviousData: true } // keep cached pages data for one hour
  );
  return {
    people: formatPeople(data?.persons),
    total: data?.total || 0,
    loading: isLoading,
    error: error ? error["message"] : "",
  };
};

export const getGeoLocation: SearchApi["getGeoLocation"] = () => {
  const {
    mutateAsync,
    isLoading,
    error,
    reset,
    isSuccess,
    data,
  } = useMutation(() => geoLocate());
  return {
    geoData: data?.coordinates,
    onGeolocate: () => mutateAsync(),
    isGeolocating: isLoading,
    geoError: error as string,
    isGeoSuccess: isSuccess,
    geoReset: () => reset(),
  };
};
