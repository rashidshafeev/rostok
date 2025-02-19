import React from 'react';
import type { BrandFilter, DynamicFilterValue } from '@/entities/filter';

interface FilterListProps {
	title: string;
	items: Array<BrandFilter | DynamicFilterValue>;
	onItemClick: (id: number) => void;
}

export const FilterList: React.FC<FilterListProps> = ({ title, items, onItemClick }) => {
	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-medium text-base">{title}</h3>
			<div className="flex flex-col gap-1">
				{items.map((item) => (
					<label
						key={'id' in item ? item.id : item.tag}
						className="flex items-center gap-2 cursor-pointer"
					>
						<input
							type="checkbox"
							checked={item.is_selected}
							onChange={() => onItemClick('id' in item ? item.id : parseInt(item.tag))}
							className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<span className="text-sm">
							{'name' in item ? item.name : item.text}
						</span>
					</label>
				))}
			</div>
		</div>
	);
};