import React from "react";
import styles from './modalOverlay.module.css';

function ModalOverlay({closeModal, children}) {
    return (
        <div className={styles.overlay} onClick={closeModal}>
             {children}
        </div>
       
    )
}
export default ModalOverlay;