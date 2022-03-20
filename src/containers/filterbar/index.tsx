import React, { useState } from "react";
import styled from "styled-components";
import { Color } from "components/theme";
import Icon from "components/icon";
import Tabs from "components/tabs";
import { Autocomplete, Button, Slider, Switch, TextField } from "@mui/material";
import { useDebounce } from "use-debounce";
import { getGeoLocation, searchAddress } from "api/search";
import { SearchForm } from "models/Search";

interface IFilterbar {
  currentForm: SearchForm;
  onSearch: (form: SearchForm) => void;
}

const Root = styled.div`
  background-color: ${Color.white};
  width: 300px;
  color: ${Color.black};
  height: 90vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin: 0 0 0 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 69vh;
`;

const Field = styled.section`
  margin: 12px 0;
`;

const Label = styled.label`
  font-size: 14px;
`;

const SwitchWrapper = styled.div`
  margin-left: -12px;
  display: flex;
  align-items: center;
`;

export default function Filterbar({ currentForm, onSearch }: IFilterbar) {
  const [activeSwitch, setActiveSwitch] = useState(false);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebounce(address, 800);
  const { addresses, loading } = searchAddress(debouncedAddress);
  const [form, setForm] = useState<SearchForm>(currentForm);
  const { onGeolocate, geoError, isGeolocating } = getGeoLocation();

  const onUpdateForm = (field: keyof SearchForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onClickGeolocate = async () => {
    if (activeSwitch) {
      return setActiveSwitch(false);
    }
    const res = await onGeolocate();
    onUpdateForm("coordinates", res?.coordinates);
  };

  return (
    <Root>
      <div style={{ padding: 24 }}>
        <Header>
          <Icon icon="filters" color={Color.blue} />
          <Title>FILTRES</Title>
        </Header>
        <Tabs
          options={[
            { id: "geo", label: "Par distance" },
            { id: "name", label: "Par nom" },
          ]}
          value={form.tab}
          onClick={(tab) => onUpdateForm("tab", tab)}
        />
        <Form>
          <div>
            {form.tab === "geo" ? (
              <div>
                <Field>
                  <Autocomplete
                    loading={loading}
                    id="adresse"
                    autoComplete
                    options={addresses.filter(({ label }) => label)}
                    renderInput={(params) => (
                      <TextField {...params} label="Adresse" />
                    )}
                    onChange={(_, value) =>
                      onUpdateForm("coordinates", value.coordinates)
                    }
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
                    <span>
                      {isGeolocating
                        ? "chargement..."
                        : geoError
                        ? geoError
                        : ""}
                    </span>
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
              </div>
            ) : (
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
              </div>
            )}
          </div>
          {/* INSERT GOOGLE ADS */}
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={() => onSearch(form)}
          >
            CHERCHER
          </Button>
        </Form>
      </div>
    </Root>
  );
}
