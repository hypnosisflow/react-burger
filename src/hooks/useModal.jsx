import React from "react";

const useModalControls = ({ disableCloseButton, disableOverlayClick } = {}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
  
    function handleOpenModal() {
      setIsModalOpen(true);
      // console.log('clicked')
    }
  
    function handleCloseModal(requester) {
      setIsModalOpen(false);
    }
  
    return {
      open: handleOpenModal,
      close: handleCloseModal,  
      modalProps: {
        isOpen: isModalOpen,
        requestClose: handleCloseModal,
        disableCloseButton,
        disableOverlayClick
      }
    };
  }

  export default useModalControls; 