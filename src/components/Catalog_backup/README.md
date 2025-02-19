# Catalog Component Backup

This directory contains the original Catalog component before the FSD (Feature-Sliced Design) refactoring. It is kept as a reference and backup while transitioning to the new architecture.

## New Implementation

The new implementation can be found in:
- Features: `src/features/catalog` and `src/features/filters`
- Widget: `src/widgets/catalog`
- Page: `src/pages/CatalogPage`

The new implementation follows FSD principles with:
- Separated business logic into slices
- Modular filter components
- Clear separation of concerns
- Proper state management
- Type safety improvements

This backup can be safely removed once the new implementation is fully tested and deployed.