import React, { useState } from 'react';

interface Filter {
  id: string;
  name: string;
  isSelected: boolean;
}

interface FiltersProps {
  onFiltersChange: (filters: { minPrice: number | null; maxPrice: number | null; brands: { [key: string]: boolean } }) => void;
  initialFilters: { minPrice: number | null; maxPrice: number | null; brands: { [key: string]: boolean } };
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChange, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (filterId: string, value: any) => {
    setFilters({ ...filters, [filterId]: value });
    onFiltersChange({ ...filters, [filterId]: value });
  };

  return (
    <div>
      {/* Price Filter */}
      <div>
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          value={filters.minPrice || ''}
          onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value, 10) || null)}
        />
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          value={filters.maxPrice || ''}
          onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value, 10) || null)}
        />
      </div>

      {/* Brand Filter (example with checkboxes) */}
      <div>
        <label>Brands:</label>
        {Object.entries(filters.brands).map(([brandId, isSelected]) => (
          <div key={brandId}>
            <input
              type="checkbox"
              id={brandId}
              checked={isSelected}
              onChange={(e) => handleFilterChange('brands', { ...filters.brands, [brandId]: e.target.checked })}
            />
            <label htmlFor={brandId}>{brandId}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
