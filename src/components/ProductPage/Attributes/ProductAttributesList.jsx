import React, { useEffect, useState } from 'react'
import ProductAttributeValue from './ProductAttributeValue';
import { useNavigate, useParams } from 'react-router-dom';

function ProductAttributesList({ variants, setCurrentProduct }) {
    console.log('ProductAttributesList render')

const [attributesList, setAttributesList] = useState([])


    const params = useParams()

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
              return Number(prodAttribute.id) === Number(attribute.id) && Number(prodAttribute.value) === Number(attribute.value);
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
        const id = Number(event.currentTarget.getAttribute("data-id"))
        const value = event.currentTarget.getAttribute("data-value")
        const text = event.currentTarget.getAttribute("data-text")

        const newAttributes = JSON.parse(JSON.stringify(extractCurrentValues(attributesList)))

        newAttributes.find(attr => Number(attr.id) === Number(id)).value = value
        newAttributes.find(attr => Number(attr.id) === Number(id)).text = text

        if (!getProductByAttributes(newAttributes, variants)) {
          console.log(variants)
         const newAttributes = findAvailableProductByValue(id, value, variants).attributes

          const newProduct = getProductByAttributes(newAttributes, variants)
        // const availableProductsList = getAvailableProductsByAttributeValues(newAttributes, variants)
        // const availableValuesList = getAttributesValuesListFromProductsList(availableProductsList)

        // const fullList = getAttributesValuesListFromProductsList(variants)
        // const newReadyAttributesList = setAvailableProperty(setCurrentProperty(fullList, newProduct.attributes),  availableValuesList)
        
        navigate(`../${newProduct.slug}`, { replace: true })

        // setAttributesList(newReadyAttributesList)
        // setCurrentProduct(newProduct)
          
        } else {
          
        const newProduct = getProductByAttributes(newAttributes, variants)
        // const availableProductsList = getAvailableProductsByAttributeValues(newAttributes, variants)
        // const availableValuesList = getAttributesValuesListFromProductsList(availableProductsList)

        // const fullList = getAttributesValuesListFromProductsList(variants)
        // const newReadyAttributesList = setAvailableProperty(setCurrentProperty(fullList, newProduct.attributes),  availableValuesList)
        
        navigate(`../${newProduct.slug}`, { replace: true })

        // setAttributesList(newReadyAttributesList)
        // setCurrentProduct(newProduct)

        }
         
      }



      const getAvailableProductsByAttributeValues = (attributes, productList) => {
        let availableProducts = []
    
        productList.forEach((product) => {
            let checks = 0
    
            product.attributes.forEach((attr) => {
              if (attributes.some(attribute => Number(attribute.id) === Number(attr.id) && Number(attribute.value) === Number(attr.value))) {
                checks++
              }
            })

            if (checks >= (product.attributes.length - 1)) {
              availableProducts.push(product)
            }
    
          })
    
          return availableProducts
      }
    
      const findAvailableProductByValue = (id, value, productList) => {
        let available = []
        productList.forEach((product) => {
         if (product.attributes?.find(attr => Number(attr.id) === Number(id) && Number(attr.value) === Number(value))) {
          available.push(product)
         }
        })
        return available[0]
      }

    useEffect(() => {
        const fullList = getAttributesValuesListFromProductsList(variants)

        const currentAttributes = variants?.find((variant) => variant.slug === params.productId).attributes        
        const currentProduct = getProductByAttributes(currentAttributes, variants)

        if ((currentAttributes?.length === 0) || (variants.length ===  1))  {
          setCurrentProduct(variants[0])
        } else {
          setCurrentProduct(currentProduct)
        }

        const availableProductsList = getAvailableProductsByAttributeValues(currentAttributes, variants)
        const availableValuesList = getAttributesValuesListFromProductsList(availableProductsList)

        const readyAttributesList = setAvailableProperty(setCurrentProperty(fullList, currentProduct.attributes),  availableValuesList)
        setAttributesList(readyAttributesList)
    }, [params])



    return (
      
        <>
            {attributesList && Object.keys(attributesList).map(attr => {
              console.log(attributesList[attr])
                return (
                    <div key={attr}>
                        <div className='flex' ><p className='text-colDarkGray mr-1'>{attr}:</p>{attributesList[attr]?.values[0]?.type === 'color' && attributesList[attr]?.values?.find(value => value.current)?.text} </div>
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