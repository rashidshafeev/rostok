import React, { useState, useEffect } from 'react';
import type { PriceFilter as PriceFilterType } from '@/entities/filter';

interface PriceFilterProps {
	price: PriceFilterType;
	onChange: (value: { min: number; max: number }) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({ price, onChange }) => {
	const [minPrice, setMinPrice] = useState(price.current_values?.min || price.min);
	const [maxPrice, setMaxPrice] = useState(price.current_values?.max || price.max);

	useEffect(() => {
		setMinPrice(price.current_values?.min || price.min);
		setMaxPrice(price.current_values?.max || price.max);
	}, [price]);

	const handleChange = () => {
		onChange({
			min: minPrice,
			max: maxPrice,
		});
	};

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-medium text-base">Цена</h3>
			<div className="flex gap-2">
				<input
					type="number"
					value={minPrice}
					onChange={(e) => setMinPrice(Number(e.target.value))}
					onBlur={handleChange}
					min={price.min}
					max={maxPrice}
					placeholder="От"
					className="w-full px-3 py-2 border border-gray-300 rounded-md"
				/>
				<input
					type="number"
					value={maxPrice}
					onChange={(e) => setMaxPrice(Number(e.target.value))}
					onBlur={handleChange}
					min={minPrice}
					max={price.max}
					placeholder="До"
					className="w-full px-3 py-2 border border-gray-300 rounded-md"
				/>
			</div>
		</div>
	);
};