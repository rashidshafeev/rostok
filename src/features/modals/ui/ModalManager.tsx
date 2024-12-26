import React from 'react';
import {
  LogoutModal,
  AuthModal,
  ShareModal,
  QuestionModal,
  ConfirmationModal,
  ModificationAttributesModal,
  ShareCartModal,
  ShowSharedCartModal
} from './modals';

export const ModalManager: React.FC = () => {
  return (
    <>
      <LogoutModal />
      <AuthModal />
      <ShareModal />
      <QuestionModal />
      <ConfirmationModal />
      <ModificationAttributesModal />
      <ShareCartModal />
      <ShowSharedCartModal />
    </>
  );
};
