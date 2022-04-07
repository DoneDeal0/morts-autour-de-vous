import { useState } from "react";
import { getGeoLocation } from "api/search";
import { Color } from "components/theme";
import { SearchForm } from "models/Search";

export default function useGeoForm(
  onUpdateForm: (field: keyof SearchForm, value: any) => void
) {
  const [activeSwitch, setActiveSwitch] = useState(false);

  const {
    onGeolocate,
    geoError,
    isGeolocating,
    isGeoSuccess,
    geoData,
  } = getGeoLocation();

  const onClickGeolocate = async () => {
    try {
      if (activeSwitch) {
        return setActiveSwitch(!activeSwitch);
      }
      setActiveSwitch(true);
      await onGeolocate();
      return onUpdateForm("coordinates", geoData);
    } catch (err) {
      return setActiveSwitch(false);
    }
  };

  const geoLocateLegend = isGeolocating
    ? "chargement..."
    : geoError
    ? geoError
    : isGeoSuccess
    ? "✓ localisation enregistrée"
    : "";

  const geoFeedback = {
    legend: geoLocateLegend,
    color: geoError ? Color.red : Color.blue_half,
    active: activeSwitch,
  };

  return {
    geoFeedback,
    onClickGeolocate,
  };
}
