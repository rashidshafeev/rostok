import { Outlet } from 'react-router-dom';
import { Footer, Header } from '..';
import { useState } from 'react';
import MobileNavbar from '../Header/MobileNavbar';
import LogoutModal from '../../helpers/CModal/LogoutModal';
import { ModalProvider } from '../../context/ModalContext';
import AuthModal from '../../helpers/CModal/AuthModal';


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
      </ModalProvider>
    </>
  );
};

export default Layout;
