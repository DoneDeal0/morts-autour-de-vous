import React from "react";
import styled from "styled-components";
import { Color } from "components/theme";

interface IProfile {
  profile: any;
}

const Root = styled.div`
  display: flex;
  align-items: center;
  color: ${Color.black};
  cursor: pointer;
`;

export default function PostPreview({ profile }: IProfile) {
  return (
    <Root>
      <div style={{ minWidth: 250 }}>profile here</div>
    </Root>
  );
}
