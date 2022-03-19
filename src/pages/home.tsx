import React from "react";
import Filterbar from "containers/filterbar";
import { searchPeople } from "api/search";

export default function Home() {
  const { loading, error, onSearch } = searchPeople();
  return (
    <div>
      <Filterbar onSearch={onSearch} />
    </div>
  );
}
