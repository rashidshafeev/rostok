export enum OrderBy {
  popularity = 'popularity',
  price = 'price',
  rating = 'rating',
  discount = 'discount',
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export interface SortingParams {
  orderBy: OrderBy | null;
  sortOrder: SortOrder | null;
}
