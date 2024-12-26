import React from 'react';
import {
  ShareModal,
  QuestionModal,
  ConfirmationModal,
  ModificationAttributesModal,
  ShareCartModal,
  ShowSharedCartModal
} from './modals';
import { AuthModal, LogoutModal } from '@/features/auth/ui/modals';

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
