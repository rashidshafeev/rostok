import { Outlet } from 'react-router-dom';
import { Footer, Header } from '..';
import { useState } from 'react';
import MobileNavbar from '../Header/MobileNavbar';

const Layout = () => {
  const [showCatalog, setShowCatalog] = useState(false);

  return (
    <>
      <Header showCatalog={showCatalog} setShowCatalog={setShowCatalog} />
      <Outlet />
      <MobileNavbar />
      <Footer />
    </>
  );
};

export default Layout;
