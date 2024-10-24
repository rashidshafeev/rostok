// src/context/ModalContext.js

import React, { createContext, useContext, useState } from 'react';

// Define the context with default values
const ModalContext = createContext({
  showModal: () => {},
  hideModal: () => {},
  modalContent: null,
  isModalVisible: false,
  modalProps: {},
});

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setModalContent(null);
    setIsModalVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, hideModal, modalContent, isModalVisible }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for using the modal context
export const useModal = () => useContext(ModalContext);
