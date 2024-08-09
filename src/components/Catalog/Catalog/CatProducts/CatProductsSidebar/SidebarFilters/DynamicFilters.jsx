import React from 'react'
import CheckboxFilter from './CheckboxFilter'
import { useFilters } from '../../../../../../context/CatalogContext'

function DynamicFilters({ filters }) {


  return (
    filters?.dynamics?.map((filter, index) => (
              <CheckboxFilter  key={filter.id} filter={filter} filters={filters} />
    ))
  )
}

export default DynamicFilters