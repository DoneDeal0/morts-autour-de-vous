/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from "react-query";
import { router } from "api/search/router";
import { SearchApi } from "models/Api";
import { formatAddresses, geoLocate } from "./utils";
import { ITab, SearchForm } from "models/Search";

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

export const searchPeople: SearchApi["searchPeople"] = () => {
  const {
    mutateAsync,
    isLoading,
    error,
    data,
  } = useMutation((form: SearchForm) => router.searchPeople(form));
  return {
    people: data,
    onSearch: (form: SearchForm) => mutateAsync(form),
    loading: isLoading,
    error: error ? error["message"] : "",
  };
};

export const getGeoLocation: SearchApi["getGeoLocation"] = () => {
  const { mutateAsync, isLoading, error, reset } = useMutation(() =>
    geoLocate()
  );
  return {
    onGeolocate: () => mutateAsync(),
    isGeolocating: isLoading,
    geoError: error as string,
    geoReset: () => reset(),
  };
};
