import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from '..';
import { excludedPaths } from '../../helpers/BreadCrumbs/crumbLinkReplacer';
import Breadcrumbs from '../../helpers/BreadCrumbs/BreadCrumbs';

const Layout = () => {
  const { pathname } = useLocation();

  const shouldRenderBreadcrumbs = !excludedPaths.includes(pathname);

  return (
    <>
      <Header />
      {shouldRenderBreadcrumbs && <Breadcrumbs />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
