import React, { useState } from "react";
import { searchPeople } from "api/search";
import DataContainer from "containers/data";
import Filterbar from "containers/filterbar";
import Footer from "containers/footer";
import Map from "containers/map";
import { SearchForm } from "models/Search";

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
  const { loading, error, people, pages, total } = searchPeople(
    form,
    allowSearch
  );

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
          <Map
            points={people}
            coordinates={form.coordinates}
            showCircle={form.tab === "geo"}
          />
        </DataContainer>
      </div>
      <Footer onClickPage={onClickPage} page={form.page} pages={pages} />
    </div>
  );
}
