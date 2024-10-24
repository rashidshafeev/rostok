import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import dummylogo from '../../assets/images/dummy-logo.png';

import { useDispatch } from 'react-redux';

import ProductAttributesList from '../../components/ProductPage/Attributes/ProductAttributesList';
import ProductTabs from '../../components/ProductPage/ProductTabs/ProductTabs';
import RightBar from '../../components/ProductPage/RightBar';
import CharacteristicsList from '../../components/ProductPage/CharacteristicsList';
import TopControls from '../../components/ProductPage/TopControls';
import ProductGallery from '../../components/ProductPage/ProductGallery';
import Breadcrumbs from '../../helpers/BreadCrumbs/BreadCrumbs';
import MobileInfo from '../../components/ProductPage/Mobile/MobileNameBar';
import MobileProductInfo from '../../components/ProductPage/Mobile/MobileProductInfo/MobileProductInfo';
import MobileTopBar from '../../components/ProductPage/Mobile/MobileTopBar';
// import { useIntersection } from 'react-use';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
import { addToRecentItems } from '../../redux/slices/recentItemsSlice';

function ProductPage() {
  const token =  getTokenFromCookies()
  const [currentProduct, setCurrentProduct] = useState({})
  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("to top fired")
    scrollToTop();
  }, []);

  // const addCard = useRef(null);
  // const addCardVisible = useIntersection(addCard, {
  //   root: null,
  //   rootMargin: '0px',
  //   threshold: 1
  // });

  console.log('ProductPage render')

  const loader = useLoaderData()

  const group = loader.data

  // if (navigation.state === 'loading') {
  //   return <Loading/>;
  // }
  useEffect(() => {
    if (!token && currentProduct.id) {
      dispatch(addToRecentItems({...currentProduct, visitTime: new Date()}))
    }
  }, [currentProduct]);

  return (
    <>
      <div className='content lining-nums proportional-nums'>
        <Breadcrumbs breadCrumps={group?.category_chain} />
        <div className='lg:block hidden'>
          <div className=' text-xl font-semibold mb-[10px]'>{group.name} {currentProduct.name}</div>
          <TopControls product={currentProduct} reviews={group.reviews} />
        </div>
        <div className='lg:hidden'>
          <MobileTopBar product={currentProduct} />
        </div>
        <div className='flex  flex-wrap pb-5 min-h-[420px] gap-5'>
          <div className='lg:basis-[calc(42%-40px/3)] basis-full'>
            <ProductGallery files={currentProduct.files} tags={currentProduct.tags} />
          </div>
          <MobileInfo name={`${group.name} ${currentProduct.name}`} reviews={group.reviews} sku={currentProduct.sku} />

          <div className='lg:basis-[calc(33%-40px/3)] flex flex-col gap-[10px] basis-full'>

            <div><img className='h-6' src={dummylogo} alt='*' /></div>
            {group?.variants && <ProductAttributesList variants={group?.variants} setCurrentProduct={setCurrentProduct} />}

            <div className='lg:block hidden'>
              {currentProduct.attributes && <CharacteristicsList current={currentProduct} product={group} setTabIndex={setTabIndex} />}

            </div>
          </div>

          {/* <div ref={addCard} className='lg:basis-[calc(25%-40px/3)] basis-full'>  */}
          <div className='lg:basis-[calc(25%-40px/3)] basis-full'>
            <RightBar product={currentProduct} />
          </div>

        </div>

        <div className='lg:block hidden pb-5 min-h-[420px] gap-5'>
          <ProductTabs current={currentProduct} group={group} tabIndex={tabIndex} setTabIndex={setTabIndex}></ProductTabs>
        </div>

        <div className='lg:hidden'>
          <MobileProductInfo current={currentProduct} product={group} />
        </div>




      </div>
      {/* {(addCardVisible && addCardVisible.intersectionRatio < 1) && <MobileAddToCartBar product={currentProduct} />} */}

    </>
  )
}




export default ProductPage