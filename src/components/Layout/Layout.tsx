import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import MobileNavbar from '@components/Header/MobileNavbar';
import LogoutModal from '../../helpers/CModal/LogoutModal';
import { ModalProvider } from '@context/ModalContext';
import AuthModal from '../../helpers/CModal/AuthModal/AuthModal';
import ShareModal from '../../helpers/CModal/ShareModal';
import { Toaster } from 'sonner';
import QuestionModal from '../../helpers/CModal/QuestionModal';
import ConfirmationModal from '../../helpers/CModal/ConfirmationModal';
import ModificationAttributesModal from '@/helpers/CModal/ModificationAttributesModal';

import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import ShareCartModal from '@/helpers/CModal/ShareCartModal';
import ShowSharedCartModal from '@/helpers/CModal/ShowSharedCartModal';
const Layout = () => {
  const [showCatalog, setShowCatalog] = useState(false);

  return (
    <>
      <ModalProvider>
        <Header showCatalog={showCatalog} setShowCatalog={setShowCatalog} />
        <Outlet />
        <MobileNavbar />
        <Footer />
        <LogoutModal />
        <AuthModal/>
        <ShareModal />
        <QuestionModal/>
        <ConfirmationModal/>
        <ModificationAttributesModal/>
        <ShareCartModal/>
        <ShowSharedCartModal/>
        <Toaster visibleToasts={1} position='bottom-center'  toastOptions={{ duration: 3000 }} />
      </ModalProvider>
    </>
  );
};

export default Layout;
