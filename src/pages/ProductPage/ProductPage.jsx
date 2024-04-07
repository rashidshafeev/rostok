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
import ProductPageContent from './ProductPageContent';


function ProductPage() {
  const [currentData, setCurrentData] = useState({})
  // const [product, setProduct] = useState({})

  const [currentGroup, setCurrentGroup] = useState([]);

  const [attributesList, setAttributesList] = useState({})
  const [currentAttributes, setCurrentAttributes] = useState({})
  // const currentAttributes = useRef({})
  const [currentProductGroup, setCurrentProductGroup] = useState({})
  // const currentProductGroup = useRef({})
  const [currentProduct, setCurrentProduct] = useState({})

  console.log("ProductPage")
  const params = useParams()
  const loader = useLoaderData()
const navigate = useNavigate()


console.log("loader.data")
console.log(loader.data)

  // const isInCurrentGroup = () => {
  //   console.log("check")
  //   console.log(currentGroup)
  //   console.log(currentGroup.some(variant => variant.slug === params.productId))

  //   if (!(currentProductGroup.length === 0)) {
  //     return currentGroup.some(variant => variant.slug === params.productId)
  //   } else {
  //     return false
  //   }
  // }

  // const { isLoading, isFetching, isError, isSuccess, error, data, refetch } = useGetProductsQuery(params.productId, {
  //   skip: isInCurrentGroup(),
  //   // refetchOnMountOrArgChange: true,
  // })
  // console.log(isLoading, isFetching, isError, isSuccess, error, data, refetch)

  
  // // useEffect(() => {
  // //   if (data) {
  // //     setProduct(data.data)
  // //   }

  // // }, [])

  // // if (isSuccess) {
  // //   setProduct(data.data)
  // // }



  // // const [getProduct] = useLazyGetProductsQuery()

  // // let product = null

  // // const loadData = async () => {


  // //    const result = await getProduct(params.productId).unwrap()
  // //    console.log("result")
  // //    console.log(result)
  // //   product = result.data

  // //   getAttributeList()
  // //   getProducts()

  // // }

  // // useEffect(loadData, [])

const product = loader.data

  const getAttributeList = () => {
    const attributesList = {}
    const attributesState = {}

    product?.variants.forEach((variant, varIndex) => {

    // group?.variants.forEach((variant, varIndex) => {

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


    setAttributesList(attributesList)
    setCurrentAttributes(attributesState)

    console.log(attributesList)
    console.log(attributesState) // currentAttributes.current = attributesState
  
  }


  const getProducts = () => {
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

    setCurrentProduct(currentProduct)
   navigate(`../${currentProduct.slug}`, { replace: true })


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

  // console.log(currentAttributes)

  useEffect(getAttributeList, [])
  useEffect(getProducts, [])
  useEffect(getProductByAttributes, [currentAttributes])
  useEffect(getActiveAttributes, [currentAttributes])


  const cart = useSelector(state => state?.cart)
  const favorite = useSelector(state => state?.favorite)
  const comparison = useSelector(state => state?.comparison)
  
  const dispatch = useDispatch()


  const isProductInCart = cart?.cart?.some((el) => el?.id === product?.id);
  const isProductInFavorite = favorite?.favorite?.some((el) => el?.id === product?.id);
  const isProductInComparison = comparison?.comparison?.some((el) => el?.id === product?.id);

  

    return (

      <div className='content lining-nums proportional-nums'>

        <div className=''>
          <div className='text-xl font-semibold mb-[10px]'>{currentProduct.name}</div>
          <TopControls product={currentProduct} reviews={loader.data.reviews}/>
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
            <RightBar product={currentProduct}/>
          </div>
  
        </div>
        <div className='flex pb-5 min-h-[420px] gap-5'>
  
          <ProductTabs product={currentProduct} reviews={loader.data.reviews}></ProductTabs>
  
        </div>
      </div>
  
  
    )
  }




export default ProductPage