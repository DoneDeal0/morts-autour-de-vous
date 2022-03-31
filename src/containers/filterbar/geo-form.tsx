import React, { useState } from "react";
import { Autocomplete, Slider, Switch, TextField } from "@mui/material";
import { useDebounce } from "use-debounce";
import { getGeoLocation, searchAddress } from "api/search";
import { Color } from "components/theme";
import { SearchForm } from "models/Search";
import { Field, Label, SwitchWrapper } from "./form";

interface IGeoForm {
  form: SearchForm;
  onUpdateForm: (field: keyof SearchForm, value: any) => void;
}

export default function GeoForm({ onUpdateForm, form }: IGeoForm) {
  const [address, setAddress] = useState("");
  const [activeSwitch, setActiveSwitch] = useState(false);
  const [debouncedAddress] = useDebounce(address, 800);
  const { addresses, loading } = searchAddress(debouncedAddress);

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

  return (
    <div>
      <Field>
        <Autocomplete
          loading={loading}
          id="adresse"
          autoComplete
          options={addresses.filter(({ label }) => label)}
          renderInput={(params) => <TextField {...params} label="Adresse" />}
          value={address || ""}
          onChange={(_, value) => {
            //@ts-ignore
            setAddress(value?.label);
            onUpdateForm(
              "coordinates",
              //@ts-ignore
              value?.coordinates?.reverse()
            );
          }}
          onInputChange={(_, newAddress) => setAddress(newAddress)}
        />
      </Field>
      <Field>
        <Label>Me géolocaliser</Label>
        <SwitchWrapper style={{ marginLeft: -12 }}>
          <Switch
            onChange={onClickGeolocate}
            checked={activeSwitch}
            inputProps={{ "aria-label": "geolocation" }}
          />
          <span
            style={{
              fontSize: 14,
              color: geoError ? Color.red : Color.blue_half,
            }}
          >
            {isGeolocating
              ? "chargement..."
              : geoError
              ? geoError
              : isGeoSuccess
              ? "✓ localisation enregistrée"
              : ""}
          </span>
        </SwitchWrapper>
      </Field>
      <Field>
        <Label>Recherche stricte</Label>
        <SwitchWrapper style={{ marginLeft: -12 }}>
          <Switch
            onChange={() => onUpdateForm("fuzzy", !form.fuzzy)}
            checked={!form.fuzzy}
            inputProps={{ "aria-label": "geolocation" }}
          />
        </SwitchWrapper>
      </Field>
      <Field>
        <Label>Périmètre de recherche ({form.distance}km)</Label>
        <Slider
          min={1}
          max={20}
          aria-label="Distance"
          value={form.distance}
          onChange={(_, v) => onUpdateForm("distance", v as number)}
        />
      </Field>
      <Field>
        <Label>A partir de l'année ({form.fromYear})</Label>
        <Slider
          min={1970}
          max={+new Date().getFullYear()}
          aria-label="A partir de l'année"
          value={form.fromYear}
          onChange={(_, v) => onUpdateForm("fromYear", v as number)}
        />
      </Field>
    </div>
  );
}
