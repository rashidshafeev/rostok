# Catalog Architecture Documentation

## Overview
The catalog feature has been refactored following Feature-Sliced Design (FSD) principles to improve maintainability, testability, and separation of concerns.

## Architecture Layers

### Shared Layer
- `shared/types`: Common types for filters and catalog
- `shared/lib/url`: URL parameter handling utilities
	- `QueryParamsUtil`: Generic utility for parsing and building URL parameters

### Features Layer

#### Catalog Feature
- Model:
	- `catalogSlice`: Products state management
	- `filtersSlice`: Filter state management
	- `sortingSlice`: Sorting state management
	- `paginationSlice`: Pagination state management
	- `viewSlice`: View type state management

- Hooks:
	- `useCatalog`: Main hook combining all catalog functionality
	- `useCatalogFilters`: Filter state and operations
	- `useCatalogSort`: Sorting state and operations
	- `useCatalogView`: View type state and operations
	- `useCatalogPagination`: Pagination state and operations

- UI Components:
	- `CatalogView`: View type switcher (tile/line/narrow)
	- `ProductList`: Product grid/list display
	- `CatalogSort`: Sorting controls
	- `CatalogLoadingState`: Loading state display

#### Filters Feature
- UI Components:
	- `FilterSidebar`: Desktop filters panel
	- `FilterModal`: Mobile filters modal
	- `FilterList`: Generic filter list component
	- `PriceFilter`: Price range filter

### Widget Layer
- `CatalogWidget`: Main catalog component composing all features

## State Management
Each slice manages its own part of the state:
- `catalogSlice`: Products data and loading state
- `filtersSlice`: Filter options and selections
- `sortingSlice`: Sort order and direction
- `paginationSlice`: Page number, limit, and total count
- `viewSlice`: Display mode (tile/line/narrow)

## URL Synchronization
URL parameters are synchronized with the application state using the `QueryParamsUtil`. This ensures:
- Shareable URLs with filter/sort/pagination state
- Browser history navigation
- State persistence across page reloads

## Testing
Unit tests cover:
- All Redux slices
- URL parameter utilities
- Component functionality (TODO)

## Usage Example
```typescript
// In a page component
const CatalogPage = () => {
	const { categoryId } = useParams();
	const {
		products,
		filters,
		sort,
		view,
		pagination,
		isLoading,
		updateFilters,
		handleSortChange,
		handleViewChange,
		handlePaginationChange,
	} = useCatalog(categoryId);

	return (
		<CatalogWidget
			products={products}
			filters={filters}
			sort={sort}
			view={view}
			pagination={pagination}
			isLoading={isLoading}
			onFilterChange={updateFilters}
			onSortChange={handleSortChange}
			onViewChange={handleViewChange}
			onPageChange={handlePaginationChange}
		/>
	);
};
```