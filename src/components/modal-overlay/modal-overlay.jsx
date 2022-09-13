import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

ModalOverlay.propTypes = {
  children: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
};

function ModalOverlay({ closeModal, children }) {

  
  return (
    <div className={styles.overlay} onClick={closeModal}>
      {children}
    </div>
  );
}
export default ModalOverlay;
