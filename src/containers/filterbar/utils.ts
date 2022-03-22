import { SearchForm } from "models/Search";

export default function isFormValid(form: SearchForm): boolean {
  if (form.tab === "geo") {
    if (Array.isArray(form?.coordinates)) {
      return (
        form.coordinates.length === 2 &&
        !isNaN(form?.coordinates[0]) &&
        !isNaN(form?.coordinates[1])
      );
    }
    return false;
  }
  return !!form?.firstName && !!form?.lastName;
}
