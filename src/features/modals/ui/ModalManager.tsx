import type React from 'react';

import { AuthModal, LogoutModal } from '@/features/auth/ui/modals';
import { ShowSharedCartModal, ShareCartModal } from '@/features/cart-share';
import { FastOrderModal } from '@/features/fast-order';

import {
  ShareModal,
  QuestionModal,
  ConfirmationModal,
  ModificationAttributesModal,
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
      <FastOrderModal />
    </>
  );
};
