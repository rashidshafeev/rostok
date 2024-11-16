import React, { useEffect, useRef, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useIntersection, useWindowSize } from 'react-use'
import { CircularProgress } from '@mui/material'
import ProductPageDesktop from '@components/ProductPage/ProductPageDesktop'
import ProductPageMobile from '@components/ProductPage/ProductPageMobile'
import { useGetProductQuery } from '@api/productEndpoints'
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop'

const ProductPage = () => {
  const { productId } = useParams()
  const { width } = useWindowSize()
  const dispatch = useDispatch()
  const prevProductId = useRef(productId)
  const [isChanging, setIsChanging] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, isSuccess } = useGetProductQuery(productId)
  
  // Keep track of previous data
  const prevDataRef = useRef(data)
  useEffect(() => {
    if (data && isSuccess) {
      prevDataRef.current = data
    }
  }, [data, isSuccess])

  // Use previous data during loading
  const displayData = data || prevDataRef.current
  const displayGroup = displayData?.data

  useEffect(() => {
    scrollToTop()
  }, [])

  // Handle product changes
  useEffect(() => {
    if (productId !== prevProductId.current) {
      setIsChanging(true)
      prevProductId.current = productId
    } else if (isSuccess) {
      const timer = setTimeout(() => {
        setIsChanging(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [productId, isSuccess])

  // Initial loading (no previous data)
  if (isLoading && !prevDataRef.current) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    )
  }

  // Product change loading state (overlay)
  const renderContent = () => {
    if (!displayGroup) return null

    const props = {
      group: displayGroup,
      isModalOpen,
      setIsModalOpen,
      isChanging
    }

    const content = width > 991 ? (
      <ProductPageDesktop {...props} />
    ) : (
      <ProductPageMobile {...props} />
    )

    if (isChanging) {
      return (
        <div className="relative">
          {content}
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
            <CircularProgress />
          </div>
        </div>
      )
    }

    return content
  }

  return renderContent()
}

export default ProductPage