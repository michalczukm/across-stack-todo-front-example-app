import { API_BASE_URI } from '../config';

export const shouldUseExternalService = !!API_BASE_URI;

export const buildLocalStorageEntity = (key) => ({
	get: () => JSON.parse(localStorage.getItem(key)) || [],
	set: (value) => localStorage.setItem(key, JSON.stringify(value))
});
