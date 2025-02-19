import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPage, setTotal, selectPagination } from '../../model';
import { CatalogQueryParamsUtil } from '../utils';

export const useCatalogPagination = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const pagination = useSelector(selectPagination);

	const handlePageChange = useCallback(
		(page: number) => {
			dispatch(setPage(page));

			// Update URL params
			const currentParams = CatalogQueryParamsUtil.parseQueryParams(window.location.search);
			const newParams = {
				...currentParams,
				page,
			};
			const queryString = CatalogQueryParamsUtil.buildQueryParams(newParams);
			navigate(`?${queryString}`, { replace: true });
		},
		[dispatch, navigate]
	);

	const updateTotal = useCallback(
		(total: number) => {
			dispatch(setTotal(total));
		},
		[dispatch]
	);

	return {
		pagination,
		handlePageChange,
		updateTotal,
	};
};