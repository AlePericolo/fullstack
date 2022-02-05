import { useLazyApi, useApi, useRawCall } from './api';

export const getCategories = () => {
	return useApi('GET', '/api/v1/categories');
}

export const searchArticlesHandler = () => {
	return useLazyApi('POST', '/api/v1/articles/search')
}

export const saveArticleHandler = (payload) => {
	return useLazyApi('POST', '/api/v1/article', payload)
}