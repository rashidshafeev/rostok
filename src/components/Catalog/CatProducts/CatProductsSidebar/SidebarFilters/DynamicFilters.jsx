import React from 'react'
import CheckboxFilter from './CheckboxFilter'

function DynamicFilters({ filters, changeFilters, setFilters, hideAdditional = true }) {


  return (
    filters?.dynamics?.map((filter, index) =>{
      if (filter.additional_filter !== hideAdditional) return ( <div className="sm:basis-[calc(33%-(20px*2/3))] md:basis-[calc(25%-(20px*3/4))] basis-full">
                 <CheckboxFilter  key={filter.id} filter={filter} filters={filters} setFilters={setFilters}/>
                 </div>
       )
    }
    )
  )
}

export default DynamicFilters