import React, { useCallback, useEffect, useState, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'

// import LightGallery from 'lightgallery/react';

// import 'lightgallery/css/lightgallery.css';
// import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';

// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
// import lgVideo from 'lightgallery/plugins/video';



import dummyImage from '../../assets/images/dummy-product-image.png';
import dummylogo from '../../assets/images/dummy-logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart } from '../../redux/slices/productsSlice';

import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import LeftNav from '../../components/ProductPage/Gallery/LeftNav';

import ProductAttributesList from '../../components/ProductPage/Attributes/ProductAttributesList';
import ProductTabs from '../../components/ProductPage/ProductTabs/ProductTabs';
import RightBar from '../../components/ProductPage/RightBar';
import CharacteristicsList from '../../components/ProductPage/CharacteristicsList';
import TopControls from '../../components/ProductPage/TopControls';

function ProductPage() {

  const [attributesList, setAttributesList] = useState({})
  const [currentAttributes, setCurrentAttributes] = useState({})
  const [currentProductGroup, setCurrentProductGroup] = useState({})


  const params = useParams()
  console.log("params")
  console.log(params)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductStart(params.productId))
  }, [dispatch]);

  const product = useSelector((state) => state?.product);
  console.log(product)

  // const lightGalleryRef = useRef(null);
  // const containerRef = useRef(null);
  // const [galleryContainer, setGalleryContainer] = useState(null);

  // const onInit = useCallback((detail) => {
  //   if (detail) {
  //     lightGalleryRef.current = detail.instance;
  //     lightGalleryRef.current.openGallery();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (containerRef.current) {
  //     setGalleryContainer(containerRef.current);
  //   }
  // }, []);

  const renderVideo = (item) => {
    return (
      <div className="video-wrapper">
        <iframe
          className='rounded-lg'
          width="100%"
          height="480px"
          src={item.embedUrl}
          frameBorder="0"
          allowFullScreen
          title="ex"
        />
      </div>
    );
  };

  const renderImage = (item) => {
    return (
      <div className="h-[480px] flex flex-col justify-center">
        <img src={item.original} className="shrink object-contain rounded-xl" alt="" />
      </div>
    );
  };



  const images2 = []
  product?.products?.variants[0]?.files?.forEach((file) => {
    if (file.type === "image") {

      images2.push({
        original: file.large,
        thumbnail: file.small,
        renderItem: renderImage.bind(this),
      })

    } else if (file.type === "video") {

      images2.push({
        embedUrl: file.url,
        thumbnail: 'video/mp4',
        renderItem: renderVideo.bind(this),
        originalHeight: "480px",
      })

    }

  })




  const getAttributeList = () => {
    const attributesList = {}
    const attributesState = {}

    product?.products?.variants.forEach((variant, varIndex) => {

      variant.attributes.forEach((attribute) => {

        if (!attributesList[`${attribute.id}`]) {
          attributesList[`${attribute.id}`] = {
            values: [{
              ...attribute
            }],
            name: attribute.name,
            type: attribute.type
          }
        } else if (!attributesList[`${attribute.id}`].values.find(val => val.value === attribute.value)) {
          attributesList[`${attribute.id}`].values.push({
            ...attribute
          })
        }

        if (varIndex === 0) {
          attributesState[`${attribute.id}`] = {
            ...attribute
          }
        }
      })

    })

    setAttributesList(attributesList)
    setCurrentAttributes(attributesState)
  }

  useEffect(getAttributeList, [])

  const getProducts = () => {
    const products = {}
    product?.products?.variants.forEach((variant) => {
      products[`${variant.id}`] = { ...variant }
    })

    for (const product in products) {
      let attributes = {}

      products[product].attributes.forEach((attr) => {
        attributes[`${attr.id}`] = { ...attr }
      })

      products[product].attributes = attributes
    }
    setCurrentProductGroup(products)
  }

  useEffect(getProducts, [])

  const getProductByAttributes = () => {

    const products = currentProductGroup
    let currentProduct = {}

    for (const product in products) {
      let checks = 0

      for (const id in currentAttributes) {

        if (products[product].attributes[id].value === currentAttributes[id].value) {
          checks++
        }

        if (checks === Object.keys(currentAttributes).length) {
          currentProduct = products[product]
        }

      }

    }

    console.log("currentProduct")
    console.log(currentProduct)

  }
  useEffect(getProductByAttributes, [currentAttributes])

  const getActiveAttributes = () => {

    const list = { ...attributesList }
    // console.log(list)

    for (const id in currentAttributes) {
      // console.log("currentAttributes[id]")
      // console.log(currentAttributes[id])
      // console.log(attributesList)

      list[id].values.forEach((valueCheck, valueIndex) => {
        const attributeCheck = { ...currentAttributes }
        attributeCheck[id] = {
          value: valueCheck.value,
          text: valueCheck.text
        }

        list[id].values[valueIndex][`availible`] = checkAvailibilty(attributeCheck)

      })

      setAttributesList(list)

    }


  }


  useEffect(getActiveAttributes, [currentAttributes])

  const handleChangeAttribute = (event) => {
    console.log("fired")
    const id = event.currentTarget.getAttribute("data-id")
    const value = event.currentTarget.getAttribute("data-value")
    const text = event.currentTarget.getAttribute("data-text")

    const newAttributes = { ...currentAttributes }

    newAttributes[`${id}`] = {
      value: value,
      text: text
    }

    if (checkAvailibilty(newAttributes)) {
      setCurrentAttributes(newAttributes)
    } else {
      const availible = searchAvailible(id, value)
      setCurrentAttributes(availible)
    }

    console.log("currentAttributes handler")
    console.log(currentAttributes)

  }

  const checkAvailibilty = (attributes) => {
    const products = currentProductGroup
    let currentProduct = {}

    for (const product in products) {
      let checks = 0

      for (const id in attributes) {

        if (products[product].attributes[id].value === attributes[id].value) {
          checks++
        }

        if (checks === Object.keys(attributes).length) {
          currentProduct = products[product]
        }

      }

    }

    if (Object.keys(currentProduct).length) {
      return true
    } else {
      return false
    }

  }

  const searchAvailible = (id, value) => {
    const products = currentProductGroup
    const availible = {}

    for (const product in products) {

      if (products[product].attributes[id].value === value) {
        Object.assign(availible, products[product].attributes)
      }
    }

    return availible
  }








  return (
    <div className='content lining-nums proportional-nums'>
      <div className=''>
        <div className='text-xl font-semibold mb-[10px]'>Кресло мягкое Грэйс Z-14 (изумруд) на высоких ножках с подлокотниками в гостиную, офис, зону ожидания, салон красоты</div>
        <TopControls />
      </div>
      <div className='flex pb-5 min-h-[420px] gap-5'>
        <div className='basis-5/12'>
          {/* <div
            style={{
              height: '800px',
            }}
            ref={containerRef}
          ></div> */}
          {/* <LightGallery
            container={galleryContainer}
            onInit={onInit}
            plugins={[lgThumbnail, lgVideo]}
            closable={false}
            slideDelay={400}
            thumbWidth={130}
            thumbHeight={'100px'}
            thumbMargin={6}
            appendSubHtmlTo={'.lg-item'}
            dynamic={true}
            dynamicEl={images}
            videojs
            videojsOptions={{ muted: false }}
            hash={false}
            elementClassNames={'inline-gallery-container'}
            download={false}
            backgroundColor={'#FFF'}
            addClass={'gallery'}
            showMaximizeIcon={false}
            counter={false}
          ></LightGallery> */}

          <ImageGallery renderLeftNav={(onClick, disabled) => (<LeftNav onClick={onClick} disabled={disabled} />)} items={images2} showVideo={true} additionalClass="" showFullscreenButton={false} showPlayButton={false} />

        </div>

        <div className='basis-4/12 flex flex-col gap-[10px]'>

          <div><img className='h-6' src={dummylogo} alt='*' /></div>
          <ProductAttributesList list={attributesList} current={currentAttributes} handleChangeAttribute={handleChangeAttribute}></ProductAttributesList>


          <CharacteristicsList />
        </div>

        <div className='basis-3/12'>
          <RightBar />
        </div>

      </div>
      <div className='flex pb-5 min-h-[420px] gap-5'>

        <ProductTabs></ProductTabs>

      </div>


    </div>


  )
}

export default ProductPage