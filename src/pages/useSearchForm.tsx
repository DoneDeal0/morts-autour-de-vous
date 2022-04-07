import { useState } from "react";
import { SearchForm } from "models/Search";

export default function useSearchForm() {
  const [allowSearch, setAllowSearch] = useState(false);
  const [form, setForm] = useState<SearchForm>({
    firstName: "",
    lastName: "",
    distance: 3,
    fuzzy: true,
    fromYear: 2021,
    page: 1,
    coordinates: [48.864716, 2.349014], // Paris
    tab: "geo",
  });

  const onClickSearch = (newForm: SearchForm) => {
    setAllowSearch(true);
    setForm({ ...newForm, page: 1 });
  };

  const onClickPage = (page: number) => {
    setAllowSearch(true);
    setForm((prev) => ({ ...prev, page }));
  };

  return {
    onClickPage,
    onClickSearch,
    allowSearch,
    form,
  };
}
