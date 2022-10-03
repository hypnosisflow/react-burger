import * as React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

Modal.propTypes = {
  // children: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const modalsElement = document.querySelector("#modal");

function Modal({ closeModal, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCloseEsc = (e) => e.key === "Escape" && closeModal();

    window.addEventListener("keydown", handleCloseEsc);
    return () => window.removeEventListener("keydown", handleCloseEsc);
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.root}>
      <ModalOverlay closeModal={closeModal} />

      <div className={styles.content}>
        <div className={styles.close} 
              // onClick={closeModal}
              onClick={() => dispatch({ type: "REMOVE_DETAILS"})}
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
