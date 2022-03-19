import React, { useState } from "react";
import styled from "styled-components";
import { Color } from "components/theme";
import Icon from "components/icon";
import Tabs from "components/tabs";
import { Autocomplete, Slider, TextField } from "@mui/material";
import { useDebounce } from "use-debounce";
import { searchAddress } from "api/search";

const Root = styled.div`
  background-color: ${Color.white};
  width: 300px;
  color: ${Color.black};
  padding: 24px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-left: 12px;
`;

export default function Filterbar() {
  const [tab, setTab] = useState("geo");
  const [distance, setDistance] = useState(1);
  const [geolocation, setGeolocation] = useState([0, 0]);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebounce(address, 400);
  const { addresses } = searchAddress(debouncedAddress);
  console.log("addresses", addresses);

  return (
    <Root>
      <Header>
        <Icon icon="filters" />
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
      <div>
        {tab === "geo" ? (
          <div>
            <Autocomplete
              id="adresse"
              autoComplete
              options={["lala", "lili"]}
              renderInput={(params) => (
                <TextField {...params} label="Adresse" />
              )}
              onInputChange={(_, newAddress) => setAddress(newAddress)}
            />
            <p>Périmètre de recherche</p>
            <Slider
              sx={{
                color: "red",
              }}
              aria-label="Distance"
              value={distance}
              onChange={(_, v) => setDistance(v as number)}
            />
          </div>
        ) : (
          <p>lala</p>
        )}
      </div>
    </Root>
  );
}
