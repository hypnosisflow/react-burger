import React from "react";
import styles from "./modal-overlay.module.css";
import { TModalOverlay } from "../../utils/types";

function ModalOverlay({ closeModal, children }: TModalOverlay) {
  return (
    <div className={styles.overlay} onClick={closeModal} data-cy='overlay'>
      {children}
    </div>
  );
}
export default ModalOverlay;
