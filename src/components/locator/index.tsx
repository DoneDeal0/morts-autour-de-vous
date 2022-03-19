import styled, { keyframes } from "styled-components";
import { Color } from "components/theme";

const locating = keyframes`
/* stylelint-disable */
  0% { transform: scale(0.5, 0.5); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(1.2, 1.2); opacity: 0; }
`;

export const Locator = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${Color.blue};
  border-radius: 50%;
  position: relative;
  &:before {
    opacity: 0;
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid ${Color.blue};
    z-index: 2;
    animation: ${locating} 3s ease-out infinite;
  }
`;
