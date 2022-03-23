import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Breakpoint, Color } from "components/theme";
import { SearchForm } from "models/Search";
import GeoForm from "./geo-form";
import Header from "./header";
import NameForm from "./name-form";
import SearchButton from "./search-button";
import Tabs from "./tabs";
import isFormValid from "./utils";

interface IFilterbar {
  currentForm: SearchForm;
  onSearch: (form: SearchForm) => void;
}

const RootDesktop = styled.div`
  background-color: ${Color.white};
  width: 330px;
  color: ${Color.black};
  height: 90vh;
  @media (max-width: ${Breakpoint.tabletMax}) {
    display: none;
  }
`;

const RootMobile = styled.div`
  background-color: ${Color.white};
  width: 100vw;
  color: ${Color.black};
  padding: 24px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  @media (min-width: ${Breakpoint.tabletMax}) {
    display: none;
  }
`;

const FilterWrapper = styled.div`
  padding: 24px;
  height: calc(100% - 24px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 69vh;
`;

const Panel = styled(motion.div)`
  height: 100%;
  width: 100vw;
  background-color: ${Color.white};
  color: ${Color.black};
  margin-top: 89px;
`;

export default function Filterbar({ currentForm, onSearch }: IFilterbar) {
  const [form, setForm] = useState<SearchForm>(currentForm);
  const [openPanel, setOpenPanel] = useState(false);
  const formValid = useMemo(() => isFormValid(form), [form]);
  const onUpdateForm = (field: keyof SearchForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* DESKTOP */}
      <RootDesktop>
        <FilterWrapper>
          <Header />
          <Tabs value={form.tab} onClick={onUpdateForm} />
          <Form>
            <div>
              {form.tab === "geo" ? (
                <GeoForm onUpdateForm={onUpdateForm} form={form} />
              ) : (
                <NameForm onUpdateForm={onUpdateForm} form={form} />
              )}
            </div>
            {/* INSERT GOOGLE ADS */}
            <SearchButton
              onClick={() => onSearch(form)}
              disabled={!formValid}
            />
          </Form>
        </FilterWrapper>
      </RootDesktop>
      {/* MOBILE */}
      <RootMobile>
        <Header
          openPanel={openPanel}
          onClick={() => setOpenPanel(!openPanel)}
          isMobile
        />
      </RootMobile>
      <AnimatePresence>
        {openPanel && (
          <Panel
            initial={{ opacity: 0, translateY: "-100vh" }}
            animate={{ opacity: 1, translateY: "0px" }}
            exit={{ opacity: 0, translateY: "-100vh" }}
            transition={{ duration: 0.2 }}
          >
            <FilterWrapper>
              <Tabs value={form.tab} onClick={onUpdateForm} />
              <Form>
                <div>
                  {form.tab === "geo" ? (
                    <GeoForm onUpdateForm={onUpdateForm} form={form} />
                  ) : (
                    <NameForm onUpdateForm={onUpdateForm} form={form} />
                  )}
                </div>
                {/* INSERT GOOGLE ADS */}
                <SearchButton
                  onClick={() => onSearch(form)}
                  disabled={!formValid}
                />
              </Form>
            </FilterWrapper>
          </Panel>
        )}
      </AnimatePresence>
    </div>
  );
}
