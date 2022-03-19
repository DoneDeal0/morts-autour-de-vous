import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Popover,
  PopoverArrow,
  PopoverDisclosure,
  usePopoverState,
} from "reakit/Popover";
import styled, { keyframes } from "styled-components";
import { Color } from "components/theme";

interface IProfilePopover {
  label: React.ReactNode | string;
  content: React.ReactNode | string;
}

const locating = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Root = styled.div`
  animation: ${locating} 2s ease;
`;

const StyledPopoverDisclosure = styled(PopoverDisclosure)`
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledPopover = styled(motion.div)`
  background: ${Color.white};
  padding: 24px;
  border-radius: 8px;
`;

export default function ProfilePopover({ content, label }: IProfilePopover) {
  const popover = usePopoverState({ animated: true });
  return (
    <Root>
      <StyledPopoverDisclosure {...popover}>{label}</StyledPopoverDisclosure>
      <Popover {...popover} aria-label="post-preview">
        <AnimatePresence>
          {popover.visible && (
            <StyledPopover
              key="popover"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              onAnimationComplete={popover.stopAnimation}
            >
              <PopoverArrow {...popover} style={{ fill: Color.White }} />
              {content}
            </StyledPopover>
          )}
        </AnimatePresence>
      </Popover>
    </Root>
  );
}
