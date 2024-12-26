import React, { useState } from 'react';
import { useGetBasicFiltersQuery } from '@/redux/api/productEndpoints';
import FooterAbout from './components/FooterAbout';
import FooterBuyer from './components/FooterBuyer';
import FooterContacts from './components/FooterContacts';
import FooterCopyright from './components/FooterCopyright';
import FooterDesktopMenu from './components/FooterDesktopMenu';
import FooterForm from './components/FooterForm';
import FooterInfo from './components/FooterInfo';
import FooterLogo from './components/FooterLogo';
const Footer = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState(true);
  const [menus, setMenus] = useState({
    about: false,
    buyer: false,
    info: false,
  });
  const { data: basicFilters } = useGetBasicFiltersQuery();

  return (
    <footer className='pt-10 pb-24 lg:pb-4 md:pt-14 bg-colSuperLight'>
      <div className='content'>
        <div className='lg:flex justify-between lg:space-x-5 border-b border-colGray pb-10 md:pb-20'>
          <div className='lg:max-w-[380px] xl:max-w-[580px] w-full'>
            <FooterLogo />
            <div className='md:hidden pt-5'>
              <FooterAbout 
                isOpen={menus.about}
                onToggle={() => setMenus(prev => ({ ...prev, about: !prev.about }))}
              />
              <FooterBuyer
                isOpen={menus.buyer}
                onToggle={() => setMenus(prev => ({ ...prev, buyer: !prev.buyer }))}
              />
              <FooterInfo
                isOpen={menus.info}
                onToggle={() => setMenus(prev => ({ ...prev, info: !prev.info }))}
              />
            </div>
            <FooterForm />
          </div>
          <div className='pt-8 lg:pt-0 text-center md:text-left'>
            <FooterContacts />
            <FooterDesktopMenu />
          </div>
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
