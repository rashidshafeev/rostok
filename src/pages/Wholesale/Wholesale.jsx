import React, { useEffect } from 'react'
import WantToBePartnerFrom from '@components/About/WantToBePartnerFrom'
import { scrollToTop } from '@utils/scrollToTop';

function Wholesale() {

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="content lining-nums ">
      <WantToBePartnerFrom/>
    </div>
  )
}

export default Wholesale