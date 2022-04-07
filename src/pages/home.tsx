import React from "react";
import { searchPeople } from "api/search";
import DataContainer from "containers/data";
import Filterbar from "containers/filterbar";
import Footer from "containers/footer";
import Map from "containers/map";
import useSearchForm from "hooks/useSearchForm";

export default function Home() {
  const { onClickPage, onClickSearch, allowSearch, form } = useSearchForm();
  const { loading, error, people, pages, total } = searchPeople(
    form,
    allowSearch
  );

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
            showCircle={form.tab === "geo" && people.length > 0}
            searchRadius={form.distance}
          />
        </DataContainer>
      </div>
      <Footer onClickPage={onClickPage} page={form.page} pages={pages} />
    </div>
  );
}
