export type QueryParamValue = string | number | boolean | null | undefined;
export type QueryParamArray = string[] | number[];
export type QueryParamRecord = Record<string, QueryParamValue | QueryParamArray>;

export class QueryParamsUtil {
	static parse<T extends QueryParamRecord>(
		queryString: string,
		config: {
			numberParams?: string[];
			arrayParams?: string[];
			booleanParams?: string[];
			defaultValues?: Partial<T>;
		} = {}
	): T {
		const params = new URLSearchParams(queryString);
		const result = { ...config.defaultValues } as T;

		params.forEach((value, key) => {
			// Handle null values
			if (value === 'null') {
				result[key] = null;
				return;
			}

			// Handle number params
			if (config.numberParams?.includes(key)) {
				result[key] = Number(value);
				return;
			}

			// Handle boolean params
			if (config.booleanParams?.includes(key)) {
				result[key] = value === 'true';
				return;
			}

			// Handle array params
			if (config.arrayParams?.includes(key)) {
				const isNumberArray = config.numberParams?.includes(key);
				result[key] = value.split(',').map(v => 
					isNumberArray ? Number(v) : v
				);
				return;
			}

			// Default to string
			result[key] = value;
		});

		return result;
	}

	static build(params: QueryParamRecord): string {
		const urlParams = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value === null || value === undefined) {
				return;
			}

			if (Array.isArray(value)) {
				if (value.length > 0) {
					urlParams.set(key, value.join(','));
				}
			} else {
				urlParams.set(key, String(value));
			}
		});

		return urlParams.toString();
	}
}