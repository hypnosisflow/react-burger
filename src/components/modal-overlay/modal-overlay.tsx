import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

type TModalOverlay = {
  closeModal: any;
  children?: React.ReactNode;
};
function ModalOverlay({ closeModal, children }: TModalOverlay) {
  return (
    <div className={styles.overlay} onClick={closeModal}>
      {children}
    </div>
  );
}
export default ModalOverlay;
