export type FilterValue = string | number | boolean;

export interface BaseFilter {
	id: string | number;
	name: string;
	is_active: boolean;
	is_selected: boolean;
}

export interface PriceFilter {
	min: number;
	max: number;
	current_values?: {
		min: number;
		max: number;
	};
}

export interface TagFilter extends BaseFilter {
	tag: string;
	text_color: string;
	background_color: string;
}

export interface BrandFilter extends BaseFilter {
	code: string;
	image: {
		original: string;
		thumbnail: string;
	};
}

export interface DynamicFilterValue extends BaseFilter {
	text: string;
	color?: string;
	second_color?: string | null;
}

export interface DynamicFilter {
	id: number;
	name: string;
	type: 'color' | 'text';
	is_active: boolean;
	values: DynamicFilterValue[];
}

export interface FiltersState {
	basics: {
		price: PriceFilter | false;
		tags: TagFilter[];
		brands: BrandFilter[];
		rating: number[];
	};
	dynamics: DynamicFilter[];
	more: DynamicFilter[];
}

export type FilterType = 'price' | 'brand' | 'tag' | 'dynamic';

export interface FilterUpdatePayload {
	type: FilterType;
	value?: any;
	id?: number | string;
	filterId?: number;
}