// This is a backup of the original Catalog component before FSD refactoring

import { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ProductCard } from '@/components/ProductCard';
import { ProductCardLine } from '@/components/ProductCardLine';
import { ProductCardNarrow } from '@/components/ProductCardNarrow';
import { Pagination } from '@/components/Pagination';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Advantages } from '@/components/Home/Advantages';
import { Brands } from '@/components/Home/Brands';
import { Promotions } from '@/components/Home/Promotions';
import { AllFiltersModal } from '@/components/AllFiltersModal';

import { useGetFilters, useGetProducts } from '@/services/api';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import type { Product } from '@/types/Product';
import type { Filter, FilterValue, PriceFilter } from '@/types/Filter';
import type { SortOrder, OrderBy } from '@/types/Sort';

interface CatalogProps {
	className?: string;
}

export const Catalog = ({ className = '' }: CatalogProps) => {
	const { categoryId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [cardView, setCardView] = useLocalStorage('cardView', 'tile');
	const [filtersModalOpen, setFiltersModalOpen] = useState(false);

	// State
	const [products, setProducts] = useState<Product[]>([]);
	const [filters, setFilters] = useState<Filter[]>([]);
	const [priceFilter, setPriceFilter] = useState<PriceFilter | null>(null);
	const [totalProducts, setTotalProducts] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
	const [orderBy, setOrderBy] = useState<OrderBy>('popularity');
	const [isLoading, setIsLoading] = useState(false);

	// API hooks
	const { data: filtersData, isLoading: isFiltersLoading } = useGetFilters({
		categoryId,
		...useQueryParams(),
	});

	const { data: productsData, isLoading: isProductsLoading } = useGetProducts({
		categoryId,
		page: currentPage,
		orderBy,
		sortOrder,
		...useQueryParams(),
	});

	// Update state from API responses
	useEffect(() => {
		if (filtersData) {
			setFilters(filtersData.filters);
			setPriceFilter(filtersData.priceFilter);
		}
	}, [filtersData]);

	useEffect(() => {
		if (productsData) {
			setProducts(productsData.products);
			setTotalProducts(productsData.total);
		}
	}, [productsData]);

	// Handlers
	const handleFilterChange = useCallback(async (filterId: number, valueId: number) => {
		setIsLoading(true);
		try {
			const newFilters = filters.map(filter => {
				if (filter.id === filterId) {
					return {
						...filter,
						values: filter.values.map(value => ({
							...value,
							isSelected: value.id === valueId ? !value.isSelected : value.isSelected,
						})),
					};
				}
				return filter;
			});

			setFilters(newFilters);
			setCurrentPage(1);

			// Update URL params
			const params = new URLSearchParams(location.search);
			const selectedValues = newFilters
				.find(f => f.id === filterId)
				?.values.filter(v => v.isSelected)
				.map(v => v.id);

			if (selectedValues?.length) {
				params.set(`filter_${filterId}`, selectedValues.join(','));
			} else {
				params.delete(`filter_${filterId}`);
			}

			navigate(`?${params.toString()}`, { replace: true });
		} catch (error) {
			console.error('Failed to update filter:', error);
			toast.error('Не удалось обновить фильтр');
		} finally {
			setIsLoading(false);
		}
	}, [filters, location.search, navigate]);

	const handlePriceChange = useCallback((min: number, max: number) => {
		if (priceFilter) {
			setPriceFilter({
				...priceFilter,
				currentMin: min,
				currentMax: max,
			});

			const params = new URLSearchParams(location.search);
			params.set('minPrice', min.toString());
			params.set('maxPrice', max.toString());
			navigate(`?${params.toString()}`, { replace: true });
		}
	}, [priceFilter, location.search, navigate]);

	const handleSortChange = useCallback((newOrderBy: OrderBy, newSortOrder: SortOrder) => {
		setOrderBy(newOrderBy);
		setSortOrder(newSortOrder);
		setCurrentPage(1);

		const params = new URLSearchParams(location.search);
		params.set('orderBy', newOrderBy);
		params.set('sortOrder', newSortOrder);
		params.set('page', '1');
		navigate(`?${params.toString()}`, { replace: true });
	}, [navigate, location.search]);

	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });

		const params = new URLSearchParams(location.search);
		params.set('page', page.toString());
		navigate(`?${params.toString()}`, { replace: true });
	}, [navigate, location.search]);

	const handleViewChange = useCallback((view: 'tile' | 'line' | 'narrow') => {
		setCardView(view);
	}, [setCardView]);

	const handleReset = useCallback(() => {
		setFilters(filters.map(filter => ({
			...filter,
			values: filter.values.map(value => ({ ...value, isSelected: false })),
		})));
		if (priceFilter) {
			setPriceFilter({
				...priceFilter,
				currentMin: priceFilter.min,
				currentMax: priceFilter.max,
			});
		}
		setCurrentPage(1);
		navigate('?', { replace: true });
	}, [filters, priceFilter, navigate]);

	// Render product card based on view type
	const renderProduct = useCallback((product: Product) => {
		switch (cardView) {
			case 'line':
				return <ProductCardLine key={product.id} product={product} />;
			case 'narrow':
				return <ProductCardNarrow key={product.id} product={product} />;
			default:
				return <ProductCard key={product.id} product={product} />;
		}
	}, [cardView]);

	return (
		<div className={`min-h-[420px] ${className}`}>
			<div className="content lining-nums proportional-nums">
				<Breadcrumbs />

				<div className="flex gap-3">
					<h1 className="font-semibold text-xl mm:text-2xl lg:text-4xl text-colBlack pb-5">
						{filtersData?.category?.name}
					</h1>
					{products.length > 0 && (
						<span className="text-colDarkGray">{totalProducts}</span>
					)}
				</div>

				<div className="flex pb-10">
					{/* Sidebar Filters (Desktop) */}
					<div className="md:block hidden basis-1/4 mr-5">
						<aside className="sticky top-[76px]">
							{priceFilter && (
								<div className="mb-4">
									<h3 className="font-medium mb-2">Цена</h3>
									<div className="flex gap-2">
										<input
											type="number"
											value={priceFilter.currentMin}
											onChange={(e) => handlePriceChange(
												Number(e.target.value),
												priceFilter.currentMax
											)}
											className="w-full px-3 py-2 border border-gray-300 rounded-md"
										/>
										<input
											type="number"
											value={priceFilter.currentMax}
											onChange={(e) => handlePriceChange(
												priceFilter.currentMin,
												Number(e.target.value)
											)}
											className="w-full px-3 py-2 border border-gray-300 rounded-md"
										/>
									</div>
								</div>
							)}

							{filters.map((filter) => (
								<div key={filter.id} className="mb-4">
									<h3 className="font-medium mb-2">{filter.name}</h3>
									<div className="space-y-2">
										{filter.values.map((value: FilterValue) => (
											<label
												key={value.id}
												className="flex items-center space-x-2 cursor-pointer"
											>
												<input
													type="checkbox"
													checked={value.isSelected}
													onChange={() => handleFilterChange(filter.id, value.id)}
													className="form-checkbox"
												/>
												<span>{value.name}</span>
											</label>
										))}
									</div>
								</div>
							))}
						</aside>
					</div>

					{/* Main Content */}
					<div className="flex-1">
						{/* Controls */}
						<div className="sticky ll:static top-[76px] ll:top-auto flex justify-between items-center pb-3 xl:pb-0 bg-white z-10">
							<div className="hidden ll:flex items-center space-x-4">
								<span>Сортировать:</span>
								<select
									value={`${orderBy}-${sortOrder}`}
									onChange={(e) => {
										const [newOrderBy, newSortOrder] = e.target.value.split('-') as [OrderBy, SortOrder];
										handleSortChange(newOrderBy, newSortOrder);
									}}
									className="border border-gray-300 rounded-md px-3 py-2"
									disabled={isLoading}
								>
									<option value="popularity-desc">По популярности</option>
									<option value="price-asc">Сначала дешевле</option>
									<option value="price-desc">Сначала дороже</option>
									<option value="name-asc">По названию А-Я</option>
									<option value="name-desc">По названию Я-А</option>
								</select>
							</div>

							<div className="flex items-center space-x-4">
								<div className="flex space-x-2">
									<button
										onClick={() => handleViewChange('tile')}
										className={`p-2 ${cardView === 'tile' ? 'text-primary' : 'text-gray-400'}`}
										disabled={isLoading}
									>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M3.33333 1.66667C2.8731 1.66667 2.5 2.03976 2.5 2.5V7.5C2.5 7.96024 2.8731 8.33333 3.33333 8.33333H8.33333C8.79357 8.33333 9.16667 7.96024 9.16667 7.5V2.5C9.16667 2.03976 8.79357 1.66667 8.33333 1.66667H3.33333ZM11.6667 1.66667C11.2064 1.66667 10.8333 2.03976 10.8333 2.5V7.5C10.8333 7.96024 11.2064 8.33333 11.6667 8.33333H16.6667C17.1269 8.33333 17.5 7.96024 17.5 7.5V2.5C17.5 2.03976 17.1269 1.66667 16.6667 1.66667H11.6667ZM2.5 11.6667C2.5 11.2064 2.8731 10.8333 3.33333 10.8333H8.33333C8.79357 10.8333 9.16667 11.2064 9.16667 11.6667V16.6667C9.16667 17.1269 8.79357 17.5 8.33333 17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V11.6667ZM11.6667 10.8333C11.2064 10.8333 10.8333 11.2064 10.8333 11.6667V16.6667C10.8333 17.1269 11.2064 17.5 11.6667 17.5H16.6667C17.1269 17.5 17.5 17.1269 17.5 16.6667V11.6667C17.5 11.2064 17.1269 10.8333 16.6667 10.8333H11.6667Z"
												fill="currentColor"
											/>
										</svg>
									</button>
									<button
										onClick={() => handleViewChange('line')}
										className={`p-2 ${cardView === 'line' ? 'text-primary' : 'text-gray-400'}`}
										disabled={isLoading}
									>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M1.33301 3.6665C1.33301 3.11422 1.78072 2.6665 2.33301 2.6665H17.6663C18.2186 2.6665 18.6663 3.11422 18.6663 3.6665V5.6665C18.6663 6.21879 18.2186 6.6665 17.6663 6.6665H2.33301C1.78072 6.6665 1.33301 6.21879 1.33301 5.6665V3.6665ZM1.33301 8.99984C1.33301 8.44755 1.78072 7.99984 2.33301 7.99984H17.6663C18.2186 7.99984 18.6663 8.44755 18.6663 8.99984V10.9998C18.6663 11.5521 18.2186 11.9998 17.6663 11.9998H2.33301C1.78072 11.9998 1.33301 11.5521 1.33301 10.9998V8.99984ZM2.33301 13.3332C1.78072 13.3332 1.33301 13.7809 1.33301 14.3332V16.3332C1.33301 16.8855 1.78072 17.3332 2.33301 17.3332H17.6663C18.2186 17.3332 18.6663 16.8855 18.6663 16.3332V14.3332C18.6663 13.7809 18.2186 13.3332 17.6663 13.3332H2.33301Z"
												fill="currentColor"
											/>
										</svg>
									</button>
								</div>

								{/* Mobile Filter Button */}
								<button
									onClick={() => setFiltersModalOpen(true)}
									className="flex md:hidden items-center outline-none bg-transparent"
								>
									<img src="/icons/filter.svg" alt="Фильтры" />
									<span className="text-colBlack text-xs font-medium">
										Фильтры
									</span>
								</button>
							</div>
						</div>

						{/* Product List */}
						{isLoading || isProductsLoading ? (
							<div className="grid grid-cols-2 mm:grid-cols-3 ll:grid-cols-4 gap-4">
								{Array.from({ length: 8 }).map((_, index) => (
									<div
										key={index}
										className="animate-pulse bg-gray-200 rounded-lg h-[300px]"
									/>
								))}
							</div>
						) : products.length > 0 ? (
							<>
								<div
									className={
										cardView === 'tile'
											? 'grid grid-cols-2 mm:grid-cols-3 ll:grid-cols-4 gap-4'
											: 'space-y-4'
									}
								>
									{products.map(renderProduct)}
								</div>
								{totalProducts > 20 && (
									<Pagination
										page={currentPage}
										count={totalProducts}
										onChange={handlePageChange}
										className="mt-8"
									/>
								)}
							</>
						) : (
							<div className="text-center py-8">
								<h2 className="text-xl font-medium mb-4">
									По вашему запросу ничего не найдено
								</h2>
								<p className="text-gray-500 mb-4">
									Попробуйте изменить параметры фильтрации
								</p>
								<button
									onClick={handleReset}
									className="text-primary hover:text-primary-dark"
								>
									Сбросить все фильтры
								</button>
							</div>
						)}
					</div>
				</div>

				<AllFiltersModal
					open={filtersModalOpen}
					onClose={() => setFiltersModalOpen(false)}
					filters={filters}
					priceFilter={priceFilter}
					onFilterChange={handleFilterChange}
					onPriceChange={handlePriceChange}
					onReset={handleReset}
					isLoading={isFiltersLoading}
				/>

				<Promotions />
				<Brands />
				<Advantages />
			</div>
		</div>
	);
};