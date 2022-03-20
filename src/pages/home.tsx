import React, { useState } from "react";
import Filterbar from "containers/filterbar";
import { searchPeople } from "api/search";
import Map from "containers/map";
import DataContainer from "containers/data";
import { SearchForm } from "models/Search";

const dummyPeople = [
  {
    title: "Jean Dupont",
    lat: 48.874716,
    lng: 2.349014,
  },
  {
    title: "Marthe Lefranc",
    lat: 48.864716,
    lng: 2.349014,
  },
];

export default function Home() {
  const [form, setForm] = useState<SearchForm>({
    firstName: "",
    lastName: "",
    distance: 1,
    page: 0,
    coordinates: [48.864716, 2.349014], // Paris
  });
  const { loading, error, people, onSearch } = searchPeople();

  const onClickSearch = (newForm: SearchForm) => {
    setForm(newForm);
    onSearch(newForm);
  };

  return (
    <div style={{ display: "flex" }}>
      <Filterbar onSearch={onClickSearch} />
      <DataContainer loading={loading} error={error}>
        <Map points={dummyPeople} coordinates={form.coordinates} />
      </DataContainer>
    </div>
  );
}
