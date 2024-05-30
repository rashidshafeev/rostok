import React, { useCallback, useEffect, useState, useRef } from 'react'
import { NavLink, useLoaderData, useNavigate, useParams } from 'react-router-dom'

import dummylogo from '../../assets/images/dummy-logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart } from '../../redux/slices/productsSlice';

import ProductAttributesList from '../../components/ProductPage/Attributes/ProductAttributesList';
import ProductTabs from '../../components/ProductPage/ProductTabs/ProductTabs';
import RightBar from '../../components/ProductPage/RightBar';
import CharacteristicsList from '../../components/ProductPage/CharacteristicsList';
import TopControls from '../../components/ProductPage/TopControls';
import { useGetCategoryTreeQuery, useGetProductsQuery, useLazyGetProductsQuery } from '../../redux/api/api';
import { Loading } from '../../helpers/Loader/Loader';
import ProductGallery from '../../components/ProductPage/ProductGallery';
import Breadcrumbs from '../../helpers/BreadCrumbs/BreadCrumbs';
import MobileAddToCartBar from '../../components/ProductPage/Mobile/MobileAddToCartBar';
import MobileInfo from '../../components/ProductPage/Mobile/MobileNameBar';
import CharactersticsTab from '../../components/ProductPage/ProductTabs/CharactersticsTab';
import FilesTab from '../../components/ProductPage/ProductTabs/FilesTab';
import ReviewsTab from '../../components/ProductPage/ProductTabs/ReviewsTab';
import InfoTab from '../../components/ProductPage/ProductTabs/InfoTab';
import MobileProductInfo from '../../components/ProductPage/Mobile/MobileProductInfo/MobileProductInfo';
import MobileTopBar from '../../components/ProductPage/Mobile/MobileTopBar';
import { useIntersection } from 'react-use';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';



function ProductPage() {
  // const [attributesList, setAttributesList] = useState([])
  // const [currentAttributes, setCurrentAttributes] = useState([])
  const [currentProduct, setCurrentProduct] = useState({})

  const [tabIndex, setTabIndex] = useState(3);

  useEffect(() => {
    scrollToTop();
  }, []);


  const addCard = useRef(null);
  const addCardVisible = useIntersection(addCard, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  });

  console.log('ProductPage render')

  const params = useParams()
  const loader = useLoaderData()
  console.log("loader.data")
  console.log(loader.data)
  const group = loader.data

  const navigate = useNavigate()

  const getAttributesValuesListFromProductsList = (list) => {

    let attributeTypes = {};
    list.forEach(product => {
      product.attributes.forEach(attribute => {
        // If the attribute type is not already in the object, add it
        if (!attributeTypes[attribute.name]) {
          attributeTypes[attribute.name] = {
            name: attribute.name,
            id: attribute.id,
            values: [],
          };
        }

        // Add the attribute value to the values array if it's not already there
        if (!attributeTypes[attribute.name].values.some(val => val.text === attribute.text && val.value === attribute.value)) {
          attributeTypes[attribute.name].values.push({
            text: attribute.text,
            value: attribute.value
          });
        }

      });
    });

    return (attributeTypes)
  }


  const getProductByAttributes = (attributes) => {

    let product = group?.variants?.filter(product => {
      // Check if every attribute in the product matches with the given attributes
      return attributes.every(attribute => {
        return product.attributes.some(prodAttribute => {
          return prodAttribute.id === attribute.id && prodAttribute.value === attribute.value;
        });
      });
    });

    return product[0]
  }

  function setAvailableProperty(fullList, availableList) {
    const newList = { ...fullList}


    for (let key in newList) {
        if (newList.hasOwnProperty(key) && availableList.hasOwnProperty(key)) {
            let values1 = newList[key].values;
            let values2 = availableList[key].values;

            // Set all values to not available initially
            values1.forEach(value => {
              value.availible = false;
          });

           // Set available to true for values that exist in obj2
            for (let i = 0; i < values1.length; i++) {
                for (let j = 0; j < values2.length; j++) {
                    if (values1[i].value === values2[j].value) {
                        values1[i].available = true;
                        break;
                    }
                }
            }
        }
    }

    return newList;
}

  const handleChangeAttribute = (event) => {
    const id = event.currentTarget.getAttribute("data-id")
    const value = event.currentTarget.getAttribute("data-value")
    const text = event.currentTarget.getAttribute("data-text")

    const newAttributes = JSON.parse(JSON.stringify(currentAttributes))

    newAttributes.find(attr => attr.id === id).value = value
    newAttributes.find(attr => attr.id === id).text = text
   
    if (!getProductByAttributes(newAttributes)) {
      console.log('no product')
      console.log(findAvailableProductByValue(id, value))
      setCurrentAttributes(findAvailableProductByValue(id, value).attributes)
    } else {
      setCurrentAttributes(newAttributes)
    }
    
  }

  const getAvailableProductsByAttributeValues = (attributes) => {
    let availableProducts = []

      group?.variants.forEach((variant) => {
        let checks = 0

        variant.attributes.forEach((attr) => {
          if (attributes.some(attribute => attribute.id === attr.id && attribute.value === attr.value)) {
            checks++
          }
        })

        if (checks >= (Object.keys(attributesList).length - 1)) {
          availableProducts.push(variant)
        }

      })

      return availableProducts
  }

  const findAvailableProductByValue = (id, value) => {
    let available = []
    group?.variants?.forEach((variant) => {
     if (variant.attributes?.find(attr => attr.id === id && attr.value === value)) {
      available.push(variant)
     }
    })
    return available[0]
  }


  // useEffect(() => {
  //   setAttributesList(getAttributesValuesListFromProductsList(group.variants))

  //   const currentAttributes = group?.variants?.find((variant) => variant.slug === params.productId).attributes

  //   setCurrentAttributes(currentAttributes)
  // }, [])

  // useEffect(() => {
  //   if (currentAttributes?.length === 0) {
  //     setCurrentProduct(group?.variants[0])
  //     return
  //   }

  //   setAttributesList(setAvailableProperty(getAttributesValuesListFromProductsList(group.variants), getAttributesValuesListFromProductsList(getAvailableProductsByAttributeValues(currentAttributes))))
    
  //   const currentProduct = getProductByAttributes(currentAttributes)

  //   setCurrentProduct(currentProduct)
  //   navigate(`../${currentProduct.slug}`, { replace: true })
  // }, [currentAttributes])

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
            <ProductGallery files={currentProduct.files} />
          </div>
          <MobileInfo name={`${group.name} ${currentProduct.name}`} reviews={group.reviews} sku={currentProduct.sku} />

          <div className='lg:basis-[calc(33%-40px/3)] flex flex-col gap-[10px] basis-full'>

            <div><img className='h-6' src={dummylogo} alt='*' /></div>
            { group?.variants && <ProductAttributesList variants={group?.variants} setCurrentProduct={setCurrentProduct}/>}
            {/* <ProductAttributesList variants={loader.variants} list={attributesList} current={currentAttributes} handleChangeAttribute={handleChangeAttribute}></ProductAttributesList> */}

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
          <ProductTabs current={currentProduct} product={group} tabIndex={tabIndex} setTabIndex={setTabIndex}></ProductTabs>
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