import { QueryParamsUtil } from '@/shared/lib/url';

describe('QueryParamsUtil', () => {
	describe('parse', () => {
		it('should parse basic query params', () => {
			const queryString = 'name=test&age=25&active=true';
			const result = QueryParamsUtil.parse(queryString, {
				numberParams: ['age'],
				booleanParams: ['active'],
			});
			expect(result).toEqual({
				name: 'test',
				age: 25,
				active: true,
			});
		});

		it('should handle null values', () => {
			const queryString = 'name=null&age=null';
			const result = QueryParamsUtil.parse(queryString);
			expect(result).toEqual({
				name: null,
				age: null,
			});
		});

		it('should parse array params', () => {
			const queryString = 'ids=1,2,3&tags=a,b,c';
			const result = QueryParamsUtil.parse(queryString, {
				arrayParams: ['ids', 'tags'],
				numberParams: ['ids'],
			});
			expect(result).toEqual({
				ids: [1, 2, 3],
				tags: ['a', 'b', 'c'],
			});
		});

		it('should use default values', () => {
			const queryString = 'name=test';
			const result = QueryParamsUtil.parse(queryString, {
				defaultValues: {
					age: 0,
					active: false,
				},
			});
			expect(result).toEqual({
				name: 'test',
				age: 0,
				active: false,
			});
		});
	});

	describe('build', () => {
		it('should build query string from params', () => {
			const params = {
				name: 'test',
				age: 25,
				active: true,
			};
			const result = QueryParamsUtil.build(params);
			expect(result).toBe('name=test&age=25&active=true');
		});

		it('should handle array values', () => {
			const params = {
				ids: [1, 2, 3],
				tags: ['a', 'b', 'c'],
			};
			const result = QueryParamsUtil.build(params);
			expect(result).toBe('ids=1,2,3&tags=a,b,c');
		});

		it('should skip null and undefined values', () => {
			const params = {
				name: 'test',
				age: null,
				city: undefined,
			};
			const result = QueryParamsUtil.build(params);
			expect(result).toBe('name=test');
		});

		it('should skip empty arrays', () => {
			const params = {
				name: 'test',
				tags: [],
			};
			const result = QueryParamsUtil.build(params);
			expect(result).toBe('name=test');
		});
	});
});