import React, { useState } from "react";
import { Autocomplete, Slider, Switch, TextField } from "@mui/material";
import { useDebounce } from "use-debounce";
import { searchAddress } from "api/search";
import useGeoForm from "hooks/useGeoForm";
import { SearchForm } from "models/Search";
import { Field, Label, SwitchWrapper } from "./form";

interface IGeoForm {
  form: SearchForm;
  onUpdateForm: (field: keyof SearchForm, value: any) => void;
}

export default function GeoForm({ onUpdateForm, form }: IGeoForm) {
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebounce(address, 500);
  const { addresses, loading } = searchAddress(debouncedAddress);
  const { geoFeedback, onClickGeolocate } = useGeoForm(onUpdateForm);

  return (
    <div>
      <Field>
        <Autocomplete
          loading={loading}
          loadingText="chargement..."
          noOptionsText="pas de résultats"
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
            checked={geoFeedback.active}
            inputProps={{ "aria-label": "geolocation" }}
          />
          <span style={{ fontSize: 14, color: geoFeedback.color }}>
            {geoFeedback.legend}
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
