# Catalog Refactoring Plan

## Current Issues
- Business logic mixed with UI in Catalog.tsx
- Complex state management scattered in component
- URL params handling mixed with component logic
- Filter logic tightly coupled with component

## Project Structure
- Already have FSD architecture
- Existing catalog and filters features
- Need to properly distribute responsibilities

## Refactoring Steps

### 1. Business Logic Layer (Model)
- [ ] Move filter state management to catalog/model/filtersSlice.ts
	- [ ] Create/update filter state types
	- [ ] Define filter actions and reducers
	- [ ] Add filter selectors
- [ ] Create pagination slice in catalog/model/paginationSlice.ts
	- [ ] Define pagination state and actions
	- [ ] Add pagination selectors
- [ ] Create sorting slice in catalog/model/sortingSlice.ts
	- [ ] Define sorting state and actions
	- [ ] Add sorting selectors

### 2. Features Layer
#### Catalog Feature
- [ ] Update catalog/model/index.ts to export all slices
- [ ] Create/update hooks:
	- [ ] useCatalogPagination.ts
	- [ ] useCatalogSort.ts
	- [ ] useCatalogProducts.ts
- [ ] Update UI components:
	- [ ] CatalogContent
	- [ ] ProductList
	- [ ] CatalogSort
	- [ ] CustomPagination

#### Filters Feature
- [ ] Move filter modal to features/filters/ui
- [ ] Create filter components:
	- [ ] FilterSidebar
	- [ ] FilterModal
	- [ ] FilterList
	- [ ] FilterItem
- [ ] Add filter hooks:
	- [ ] useFilterState.ts
	- [ ] useFilterUpdate.ts
	- [ ] useFilterReset.ts

### 3. Widget Layer
- [ ] Create CatalogPage widget
	- [ ] Move layout logic from Catalog.tsx
	- [ ] Compose features together
	- [ ] Handle data fetching and state orchestration

### 4. Shared Layer
- [ ] Move URL params handling to shared/lib/url
- [ ] Create shared types for filters and catalog
- [ ] Add shared utilities for data transformation

### 5. Testing & Documentation
- [ ] Add unit tests for new slices
- [ ] Add integration tests for features
- [ ] Document new architecture and components
- [ ] Update API documentation

## Implementation Order
1. Start with model layer - create slices
2. Implement shared utilities
3. Build filter feature components
4. Update catalog feature
5. Create CatalogPage widget
6. Add tests and documentation

## Migration Strategy
1. Create new components alongside existing ones
2. Gradually move functionality
3. Switch to new implementation when ready
4. Remove old components after successful migration