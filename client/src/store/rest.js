import { useLazyApi, useApi, useRawCall } from './api';

export const getCategories = () => {
	return useApi('GET', '/api/v1/categories');
}