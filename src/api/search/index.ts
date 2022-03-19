/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from "react-query";
import { router } from "api/search/router";
import { SearchApi } from "models/Api";
import { formatAddresses, geoLocate } from "./utils";

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
