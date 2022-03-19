import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { Color } from "theme/colors";
import useBlockScroll from "./useBlockScroll";
import useClickOutside from "./useClickOutside";

interface ModaleProps {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

export const Backdrop = styled(motion.div)`
  position: fixed;
  /* stylelint-disable */
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
`;

const Content = styled(motion.div)`
  margin: 0 auto;
  max-width: 400px;
  background: ${Color.white};
  padding: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

export const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: { opacity: 1, y: "170px" },
  exit: { opacity: 0, y: "-100vh" },
};

export default function Modale({ open, content, onClose }: ModaleProps) {
  const ref = useRef(null);
  useClickOutside(ref, onClose);
  useBlockScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <Backdrop
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div>
            <Content
              ref={ref}
              variants={modal}
              initial="hidden"
              animate="visible"
              transition={{
                y: { type: "tween" },
                opacity: { duration: 0.4 },
              }}
              exit="exit"
            >
              {content}
            </Content>
          </div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
