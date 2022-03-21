import React from "react";
import Tabs from "components/tabs";
import { ITab } from "models/Search";

interface ITabs {
  value: ITab;
  onClick: (type: "tab", tab: ITab) => void;
}
export default function FormTabs({ value, onClick }: ITabs) {
  return (
    <Tabs
      options={[
        { id: "geo", label: "Par distance" },
        { id: "name", label: "Par nom" },
      ]}
      value={value}
      onClick={(tab) => onClick("tab", tab)}
    />
  );
}
