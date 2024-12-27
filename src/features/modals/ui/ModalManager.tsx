import type React from 'react';

import { AuthModal, LogoutModal } from '@/features/auth/ui/modals';

import {
  ShareModal,
  QuestionModal,
  ConfirmationModal,
  ModificationAttributesModal,
  ShareCartModal,
  ShowSharedCartModal,
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
