import { Modal, Box } from '@mui/material';
import { useCatalogFilters } from '@/features/catalog';
import { FilterList } from '../FilterList';
import { PriceFilter } from '../PriceFilter';

interface FilterModalProps {
	open: boolean;
	onClose: () => void;
	categoryId: string | null;
}

export const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, categoryId }) => {
	const { filters, isLoading, updateFilters, handleReset } = useCatalogFilters(categoryId);

	if (isLoading) {
		return null; // or loading skeleton
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="filter-modal"
		>
			<Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] bg-white rounded-lg p-4 overflow-auto">
				<div className="flex flex-col h-full">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold">Фильтры</h2>
						<button 
							onClick={onClose}
							className="text-2xl text-gray-500"
						>
							×
						</button>
					</div>

					<div className="flex-1 overflow-auto">
						<div className="space-y-4">
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
						</div>
					</div>

					<div className="mt-4 flex justify-between items-center pt-4 border-t">
						<button
							onClick={handleReset}
							className="text-gray-500 hover:text-gray-700"
						>
							Сбросить
						</button>
						<button
							onClick={onClose}
							className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
						>
							Применить
						</button>
					</div>
				</div>
			</Box>
		</Modal>
	);
};