import React, { useState } from "react";
import styled from "styled-components";
import { Color } from "components/theme";
import Icon from "components/icon";
import Tabs from "components/tabs";
import { Autocomplete, Button, Slider, Switch, TextField } from "@mui/material";
import { useDebounce } from "use-debounce";
import { getGeoLocation, searchAddress } from "api/search";

const Root = styled.div`
  background-color: ${Color.white};
  width: 300px;
  color: ${Color.black};
  padding: 24px;
  height: 100vh;
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
  height: 81vh;
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

export default function Filterbar() {
  const [tab, setTab] = useState("geo");
  const [distance, setDistance] = useState(1);
  const [activeSwitch, setActiveSwitch] = useState(false);
  const [name, setName] = useState("");
  const [geolocation, setGeolocation] = useState([0, 0]);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebounce(address, 1000);
  const { addresses } = searchAddress(debouncedAddress);
  const { onGeolocate, geoError, isGeolocating } = getGeoLocation();

  const onClickGeolocate = async () => {
    if (activeSwitch) {
      return setActiveSwitch(false);
    }
    const res = await onGeolocate();
    setGeolocation(res?.coordinates);
  };

  return (
    <Root>
      <Header>
        <Icon icon="filters" color={Color.blue} />
        <Title>FILTRES</Title>
      </Header>
      <Tabs
        options={[
          { id: "geo", label: "Par distance" },
          { id: "name", label: "Par nom" },
        ]}
        value={tab}
        onClick={setTab}
      />
      <Form>
        <div>
          {tab === "geo" ? (
            <div>
              <Field>
                <Autocomplete
                  id="adresse"
                  autoComplete
                  options={addresses.filter(({ label }) => label)}
                  renderInput={(params) => (
                    <TextField {...params} label="Adresse" />
                  )}
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
                    {isGeolocating ? "chargement..." : geoError ? geoError : ""}
                  </span>
                </SwitchWrapper>
              </Field>
              <Field>
                <Label>Périmètre de recherche ({distance}km)</Label>
                <Slider
                  min={1}
                  max={20}
                  aria-label="Distance"
                  value={distance}
                  onChange={(_, v) => setDistance(v as number)}
                />
              </Field>
            </div>
          ) : (
            <Field>
              <TextField
                fullWidth
                helperText="ex: Jean Dupont"
                id="nom"
                label="Nom de la personne décédée"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Field>
          )}
        </div>
        {/* INSERT GOOGLE ADS */}
        <Button sx={{ width: "100%" }} variant="contained">
          CHERCHER
        </Button>
      </Form>
    </Root>
  );
}
