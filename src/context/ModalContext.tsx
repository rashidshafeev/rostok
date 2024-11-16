// src/context/ModalContext.js

import { createContext, useContext, useState, ReactNode } from 'react';

// Определяем типы для разных модальных окон
type ModalTypes = {
  auth: {
    content?: string;
  };
  logout: {};
  share: {
    url?: string;
  };
  confirmation: {
    title: string;
    text: string;
    action: (product?: any) => void;
    product?: any;
  };
  question: {
    data?: any;
  };
  modificationAttributes: {
    title: string;
    attributesList: Record<string, any>;
    handleChangeAttribute: (event: React.MouseEvent<HTMLDivElement>) => void;
  };
};

// Тип для содержимого модального окна
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
}

const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
  modalContent: null,
  isModalVisible: false,
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (content: ModalContent) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setModalContent(null);
    setIsModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalContent, isModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);