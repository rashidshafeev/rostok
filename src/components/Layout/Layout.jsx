import { Outlet } from 'react-router-dom';
import { Footer, Header } from '..';
import { useState } from 'react';
import MobileNavbar from '../Header/MobileNavbar';
import LogoutModal from '../../helpers/CModal/LogoutModal';
import { ModalProvider } from '../../context/ModalContext';
import AuthModal from '../../helpers/CModal/AuthModal/AuthModal';
import ShareModal from '../../helpers/CModal/ShareModal';
import { Toaster } from 'sonner';
import QuestionModal from '../../helpers/CModal/QuestionModal';
import ConfirmationModal from '../../helpers/CModal/ConfirmationModal';

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
        <Toaster visibleToasts={1} position='bottom-center'  toastOptions={{ duration: 3000 }} />
      </ModalProvider>
    </>
  );
};

export default Layout;
