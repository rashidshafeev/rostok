import React, { useCallback, useEffect, useState, useRef } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'

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



import ProductAttributesList from '../../components/ProductPage/Attributes/ProductAttributesList';
import ProductTabs from '../../components/ProductPage/ProductTabs/ProductTabs';
import RightBar from '../../components/ProductPage/RightBar';
import CharacteristicsList from '../../components/ProductPage/CharacteristicsList';
import TopControls from '../../components/ProductPage/TopControls';
import { useGetCategoryTreeQuery, useGetProductsQuery } from '../../redux/api/api';
import { Loading } from '../../helpers/Loader/Loader';
import ProductGallery from '../../components/ProductPage/ProductGallery';

function ProductPageContent({ product }) {


 // const [group, setGroup] = useState([])
 const [attributesList, setAttributesList] = useState({})
 const [currentAttributes, setCurrentAttributes] = useState({})
 const [currentProductGroup, setCurrentProductGroup] = useState({})
 const [currentProduct, setCurrentProduct] = useState({})


 console.log("ProductPageContent")
 console.log(product )

    const navigate = useNavigate()
    const params = useParams()


 const getAttributeList = () => {
  console.log("GAList")
  console.log(product )
   const attributesList = {}
   const attributesState = {}

   product?.variants.forEach((variant, varIndex) => {


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

       if (variant.slug === params.productId) {
         attributesState[`${attribute.id}`] = {
           ...attribute
         }
       }
     })

   })

   console.log("GAList")
  console.log(attributesList )
  console.log(attributesState )
   setAttributesList(attributesList)
   setCurrentAttributes(attributesState)
 }


 const getProducts = () => {

  console.log("GProducts")
   const products = {}
   product?.variants.forEach((variant) => {
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



 const getProductByAttributes = () => {
  console.log("GPBAttr")
   const products = currentProductGroup
   let currentProduct = {}
console.log(products)
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
  console.log("GPBAttr")

   console.log(currentProduct)
   setCurrentProduct(currentProduct)

 }



 const getActiveAttributes = () => {

   const list = { ...attributesList }

   for (const id in currentAttributes) {

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



 const handleChangeAttribute = (event) => {

//    console.log("fired")

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

 console.log(currentAttributes)

 useEffect(getAttributeList, [])
 useEffect(getProducts, [])
 useEffect(getProductByAttributes, [currentAttributes])
 useEffect(getActiveAttributes, [currentAttributes])


    return (

        <div className='content lining-nums proportional-nums'>
          <div className=''>
            <div className='text-xl font-semibold mb-[10px]'>{currentProduct.name}</div>
            <TopControls />
          </div>
          <div className='flex pb-5 min-h-[420px] gap-5'>
            <div className='basis-5/12'>
              <ProductGallery files={currentProduct.files} />
    
    
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
    
            <ProductTabs product={currentProduct} reviews={product} ></ProductTabs>
    
          </div>
        </div>
    
    
      )
}

export default ProductPageContent