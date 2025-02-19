import React from 'react';
import { useCatalogFilters } from '@/features/catalog';
import { FilterList } from '../FilterList';
import { PriceFilter } from '../PriceFilter';

interface FilterSidebarProps {
	categoryId: string | null;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ categoryId }) => {
	const { filters, isLoading, updateFilters, handleReset } = useCatalogFilters(categoryId);

	if (isLoading) {
		return <div>Loading filters...</div>;
	}

	return (
		<aside className="flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">Фильтры</h2>
				<button 
					onClick={handleReset}
					className="text-sm text-gray-500 hover:text-gray-700"
				>
					Сбросить
				</button>
			</div>

			{filters.basics.price && (
				<PriceFilter
					price={filters.basics.price}
					onChange={(value) => updateFilters({ type: 'price', value })}
				/>
			)}

			{filters.basics.brands.length > 0 && (
				<FilterList
					title="Бренды"
					items={filters.basics.brands}
					onItemClick={(id) => updateFilters({ type: 'brand', id })}
				/>
			)}

			{filters.dynamics.map((filter) => (
				<FilterList
					key={filter.id}
					title={filter.name}
					items={filter.values}
					onItemClick={(id) => updateFilters({ 
						type: 'dynamic', 
						id,
						filterId: filter.id 
					})}
				/>
			))}
		</aside>
	);
};