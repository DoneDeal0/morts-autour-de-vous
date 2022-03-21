import React, { useState } from "react";
import Filterbar from "containers/filterbar";
import { searchPeople } from "api/search";
import DataContainer from "containers/data";
import Footer from "containers/footer";
import Map from "containers/map";
import { SearchForm } from "models/Search";

const dummyPeople = [
  {
    name: "joe",
    birth: "lala",
    death: "lili",
    lat: 48.864716,
    lng: 2.349014,
  },
  {
    name: "lili",
    birth: "lala",
    death: "lili",
    lat: 48.864716,
    lng: 2.349014,
  },
  {
    name: "concon",
    birth: "lala",
    death: "lili",
    lat: 48.864716,
    lng: 2.349014,
  },
  {
    name: "paul",
    birth: "lala",
    death: "lili",
    lat: 48.874716,
    lng: 2.399014,
  },
];
export default function Home() {
  const [allowSearch, setAllowSearch] = useState(false);
  const [form, setForm] = useState<SearchForm>({
    firstName: "",
    lastName: "",
    distance: 1,
    fuzzy: true,
    fromYear: 2021,
    page: 1,
    coordinates: [48.864716, 2.349014], // Paris
    tab: "geo",
  });
  const { loading, error, people, total } = searchPeople(form, allowSearch);

  const onClickSearch = (newForm: SearchForm) => {
    setAllowSearch(true);
    setForm({ ...newForm, page: 1 });
  };

  const onClickPage = (page: number) => {
    setAllowSearch(true);
    setForm((prev) => ({ ...prev, page }));
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Filterbar currentForm={form} onSearch={onClickSearch} />
        <DataContainer
          loading={loading}
          error={error}
          noResult={total === 0 && !error && !loading && allowSearch}
        >
          <Map points={dummyPeople} coordinates={form.coordinates} />
        </DataContainer>
      </div>
      <Footer onClickPage={onClickPage} page={form.page} total={total} />
    </div>
  );
}
