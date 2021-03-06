import React from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "@emotion/styled";
import { Color, Font } from "components/theme";

interface TabsProps {
  options: { id: string; label: string }[];
  value: string;
  onClick: (tab: string) => void;
}

const Root = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  transform: translateZ(0);
  > button:nth-of-type(even) {
    margin: 0 12px;
  }
`;

const Tab = styled.button<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? Color.blue : Color.grey)};
  font-weight: 600;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  background: transparent;
  text-transform: uppercase;
  border: 0;
  font-family: ${Font.primary};
  &:focus {
    outline: none !important;
  }
`;
const Line = styled(motion.div)`
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: ${Color.blue};
  position: absolute;
  bottom: -6px;
`;

export default function Tabs({ options, value, onClick }: TabsProps) {
  return (
    <AnimateSharedLayout>
      <Root>
        {options.map(({ label, id }) => (
          <Tab key={id} selected={id === value} onClick={() => onClick(id)}>
            {id === value && <Line layoutId="line" />}
            {label}
          </Tab>
        ))}
      </Root>
    </AnimateSharedLayout>
  );
}
