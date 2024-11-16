import React, { createContext, useContext, useState } from 'react';

// Define the shape of the modal content
type ModalContent = {
  type: string;
  attributesList?: any;
  handleChangeAttribute?: (event: React.MouseEvent<HTMLDivElement>) => void;
  title?: string;
} | null;

type ModalContextType = {
  showModal: (content: ModalContent) => void;
  hideModal: () => void;
  modalContent: ModalContent;
  isModalVisible: boolean;
};

// Define the context with default values
const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
  modalContent: null,
  isModalVisible: false,
});

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState<ModalContent>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (content: ModalContent) => {
    // Create a new object reference for the content
    const newContent = {
      ...content,
      attributesList: content.attributesList ? { ...content.attributesList } : null,
    };
    
    // Force a new render by setting state in the next tick
    setTimeout(() => {
      setModalContent(newContent);
      setIsModalVisible(true);
    }, 0);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setModalContent(null);
    }, 300); // Wait for modal close animation
  };

  return (
    <ModalContext.Provider
      value={{ 
        showModal, 
        hideModal, 
        modalContent, 
        isModalVisible 
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for using the modal context
export const useModal = () => useContext(ModalContext);

export type { ModalContent };