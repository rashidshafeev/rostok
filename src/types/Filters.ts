export interface FilterValue {
  id: string;
  text: string;
  is_selected: boolean;
}

export interface Filter {
  id: string;
  name: string;
  values: FilterValue[];
}

export interface Filters {
  basics: {
    price: { current_values: { min: number | null; max: number | null } };
    brands: Filter[];
    tags: Filter[];
  };
  dynamics: Filter[];
} 