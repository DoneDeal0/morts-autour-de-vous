import React from "react";
import { Slider, Switch, TextField } from "@mui/material";
import { Field, Label, SwitchWrapper } from "./form";

export default function NameForm({ form, onUpdateForm }) {
  return (
    <div>
      <Field>
        <TextField
          fullWidth
          helperText="ex: Jean"
          id="prénom"
          label="Prénom de la personne décédée"
          onChange={(e) => onUpdateForm("firstName", e.target.value)}
          value={form.firstName}
        />
      </Field>
      <Field>
        <TextField
          fullWidth
          helperText="ex: Dupont"
          id="nom"
          label="Nom de la personne décédée"
          onChange={(e) => onUpdateForm("lastName", e.target.value)}
          value={form.lastName}
        />
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
