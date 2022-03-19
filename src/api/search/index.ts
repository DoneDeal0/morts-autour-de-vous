/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "react-query";
import { router } from "api/search/router";
import { SearchApi } from "models/Api";

export const searchAddress: SearchApi["searchAddress"] = (address: string) => {
  const { data, error, isLoading } = useQuery(["search-address", address], () =>
    router.searchAddress(address)
  );
  return {
    addresses: data,
    error: error && error["message"],
    loading: isLoading,
  };
};
