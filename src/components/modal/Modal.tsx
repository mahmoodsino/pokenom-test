// src/Modal.tsx
import React, { MutableRefObject, ReactNode, useEffect, useRef } from "react";
import useLockPage from "./use-lock-page";
import useClickOutside from "./use-click-outside";

interface ModalProps {
  isOpen: boolean;
  setOpen: (ite: boolean) => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setOpen, children }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const { lockScroll, unlockScroll } = useLockPage();

  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isOpen]);

  const close = () => {
    setOpen(false);
  };

  useClickOutside(ref, close);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div ref={ref} className="modal">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
