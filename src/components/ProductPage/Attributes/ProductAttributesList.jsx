import React, { useEffect, useState } from 'react'
import ProductAttributeValue from './ProductAttributeValue';
import { useNavigate, useParams } from 'react-router-dom';

function ProductAttributesList({ variants, setCurrentProduct }) {
// function ProductAttributesList({ list, current, handleChangeAttribute }) {
    console.log('ProductAttributesList render')

const [attributesList, setAttributesList] = useState([])
  const [currentAttributes, setCurrentAttributes] = useState([])

    console.log("variants")
    console.log(variants)
    // console.log("list, current")
    // console.log(list, current)

    const params = useParams()

    const navigate = useNavigate()

    const getAttributesValuesListFromProductsList = (list) => {
        console.log("list")
        console.log(list)
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
                ...attribute
              });
            }
    
          });
        });
    
        return (attributeTypes)
      }

      const getProductByAttributes = (attributes, productList) => {

        let product = productList.filter(product => {
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
        console.log("list in available")
        console.log(availableList)
    
        for (let key in newList) {
            if (newList.hasOwnProperty(key) && availableList.hasOwnProperty(key)) {
                let values1 = newList[key].values;
                let values2 = availableList[key].values;
    
                // Set all values to not available initially
                values1.forEach(value => {
                  value.available = false;
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

    function setCurrentProperty(fullList, attributesArray) {
        const newList = { ...fullList }

        // Create a map of selected values for quick lookup
        let selectedValuesMap = attributesArray.reduce((acc, curr) => {
            acc[curr.id] = curr.value;
            return acc;
        }, {});

        // Iterate over the properties in the first object
        for (let key in newList) {
            if (newList.hasOwnProperty(key) && selectedValuesMap.hasOwnProperty(newList[key].id)) {
                // Get the selected value for the current property
                let selectedValue = selectedValuesMap[newList[key].id];

                // Iterate over the values and set the current property
                newList[key].values.forEach(value => {
                    value.current = value.value === selectedValue;
                });
            }
        }

        return newList;
        
    }

    function extractCurrentValues(obj) {
        let current = [];
    
        // Iterate over the properties in the object
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                // Find the value object with current: true
                let currentValue = obj[key].values.find(value => value.current === true);
    
                // If a current value is found, create a new object and add it to the result array
                if (currentValue) {
                    let newObj = {
                        ...currentValue
                    };
    
                    current.push(newObj);
                }
            }
        }
    
        return current;
    }

    const handleChangeAttribute = (event) => {
        const id = event.currentTarget.getAttribute("data-id")
        const value = event.currentTarget.getAttribute("data-value")
        const text = event.currentTarget.getAttribute("data-text")

        const newAttributes = JSON.parse(JSON.stringify(extractCurrentValues(attributesList)))
        newAttributes.find(attr => attr.id === id).value = value
        newAttributes.find(attr => attr.id === id).text = text
        console.log("newAttributes")
        console.log(newAttributes)
        if (!getProductByAttributes(newAttributes, variants)) {
          console.log('no product')
          setCurrentAttributes(findAvailableProductByValue(id, value).attributes)
        } else {
        setCurrentAttributes(newAttributes)
        }
         
      }



      const getAvailableProductsByAttributeValues = (attributes, productList) => {
        let availableProducts = []
    
        productList.forEach((product) => {
            let checks = 0
    
            product.attributes.forEach((attr) => {
              if (attributes.some(attribute => attribute.id === attr.id && attribute.value === attr.value)) {
                checks++
              }
            })
            console.log(checks)
            if (checks >= (product.attributes.length - 1)) {
              availableProducts.push(product)
            }
    
          })
    
          console.log("availableProducts")
          console.log(availableProducts)
          return availableProducts
      }
    
      const findAvailableProductByValue = (id, value, productList) => {
        let available = []
        productList.forEach((product) => {
         if (product.attributes?.find(attr => attr.id === id && attr.value === value)) {
          available.push(product)
         }
        })
        return available[0]
      }

    useEffect(() => {
        const fullList = getAttributesValuesListFromProductsList(variants)
        const currentAttributes = variants?.find((variant) => variant.slug === params.productId).attributes
        const currentProduct = getProductByAttributes(currentAttributes, variants)
        const availableProductsList = getAvailableProductsByAttributeValues(currentAttributes, variants)
        const availableValuesList = getAttributesValuesListFromProductsList(availableProductsList)
        const readyList = setAvailableProperty(setCurrentProperty(fullList, currentProduct.attributes),  availableValuesList)
        console.log("readyList")
        console.log(readyList)
        setAttributesList(readyList)
    }, [])

  useEffect(() => {
    if (currentAttributes?.length === 0) {
      setCurrentProduct(variants[0])
      return
    }

    setAttributesList(setAvailableProperty(getAttributesValuesListFromProductsList(variants), getAttributesValuesListFromProductsList(getAvailableProductsByAttributeValues(currentAttributes, variants))))
    
    const currentProduct = getProductByAttributes(currentAttributes, variants)

    setCurrentProduct(currentProduct)
    navigate(`../${currentProduct.slug}`, { replace: true })
  }, [currentAttributes])


    return (
      
        <>
            {Object.keys(attributesList).map(attr => {
                return (
                    <div key={attr}>
                        <div className='flex' ><p className='text-colDarkGray mr-1'>{attr}:</p>{attributesList[attr].values.find(value => value.current).text} </div>
                        <div className='flex flex-wrap gap-2'>
                            {attributesList[attr].values.map((value) => <ProductAttributeValue key={value.value} id={attributesList[attr].id} value={value} handleChangeAttribute={handleChangeAttribute} />)}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ProductAttributesList