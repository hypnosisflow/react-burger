import * as React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

type TModal = {
  closeModal: any,
  children?: React.ReactNode
}

const modalsElement = document.querySelector<any>("#modal");

const Modal = ({ closeModal, children }: TModal) => {

  useEffect(() => {
    const handleCloseEsc = (e: KeyboardEvent) => e.key === "Escape" && closeModal();

    window.addEventListener("keydown", handleCloseEsc);
    return () => window.removeEventListener("keydown", handleCloseEsc);
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.root}>
      <ModalOverlay closeModal={closeModal} />
      <div className={styles.content}>
        <div
          className={styles.close}
          onClick={closeModal}
        >
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </div>,
    modalsElement
  );
}

export default Modal;