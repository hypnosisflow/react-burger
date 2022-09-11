import * as React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../ModalOverlay/modalOverlay";

const modalsElement = document.querySelector("#modal");

function Modal({details, closeModal, children}) {

  useEffect(() => {;
    window.addEventListener('keydown', handleCloseEsc);
    return () => window.removeEventListener('keydown', handleCloseEsc);
   }, [])

   const handleCloseEsc = (e) => e.key === 'Escape' && closeModal();

  return ReactDOM.createPortal (
            <div className={styles.root}>
              <ModalOverlay closeModal={closeModal}> </ModalOverlay>
              
                <div className={styles.content}>
                    <div
                      className={styles.close}
                      onClick={closeModal}
                    >
                      <CloseIcon type='primary' />
                    </div>
                  {children}
                </div>
            </div>
      ,
      modalsElement
    )
}

export default Modal;