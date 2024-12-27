import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import type { ModalTypes } from './types';

type ModalContent = {
  [K in keyof ModalTypes]: {
    type: K;
  } & ModalTypes[K];
}[keyof ModalTypes];

interface ModalContextType {
  showModal: (content: ModalContent) => void;
  hideModal: () => void;
  modalContent: ModalContent | null;
  isModalVisible: boolean;
  isLoading: boolean;
  setModalLoading: (loading: boolean) => void;
}

const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
  modalContent: null,
  isModalVisible: false,
  isLoading: false,
  setModalLoading: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = (content: ModalContent) => {
    setModalContent(content);
    setIsModalVisible(true);
    setIsLoading(false);
  };

  const hideModal = () => {
    setIsLoading(false);
    setModalContent(null);
    setIsModalVisible(false);
  };

  const setModalLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
        modalContent,
        isModalVisible,
        isLoading,
        setModalLoading,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
