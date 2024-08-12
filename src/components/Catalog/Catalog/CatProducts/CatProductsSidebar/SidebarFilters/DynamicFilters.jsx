import React from 'react'
import CheckboxFilter from './CheckboxFilter'
import { useFilters } from '../../../../../../context/CatalogContext'

function DynamicFilters({ filters, changeFilters, setFilters }) {


  return (
    filters?.dynamics?.map((filter, index) => (
              <CheckboxFilter  key={filter.id} filter={filter} filters={filters} setFilters={setFilters}/>
    ))
  )
}

export default DynamicFilters