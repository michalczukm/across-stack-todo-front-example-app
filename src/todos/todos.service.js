import { API_BASE_URI } from '../config';

const shouldUseExternalService = !!API_BASE_URI;

const itemsLocalStorage = ((key) => ({
	get: () => JSON.parse(localStorage.getItem(key)) || [],
	set: (value) => localStorage.setItem(key, JSON.stringify(value))
}))('todos-items');

const localStorageStorage = new class LocalStorageStorage {
	addItem(newItem) {
		const existingItems = itemsLocalStorage.get();
		const lastId = Math.max(...existingItems.map(item => item.id)) || 0;

		itemsLocalStorage.set([...existingItems, {...newItem, id: lastId + 1}]);
		return Promise.resolve();
	};

	updateItem = (id, updatedItem) => Promise.resolve(
		itemsLocalStorage.set(
			itemsLocalStorage.get()
				.map((item) => item.id !== id ? item : ({
					...item,
					...updatedItem
				}))
		)
	);

	deleteItem = (id) => Promise.resolve(itemsLocalStorage.set(itemsLocalStorage.get().filter(item => item.id !== id)));

	getAll = () => Promise.resolve(itemsLocalStorage.get())
}();

const externalServiceStorage = new class ExternalServiceStorage {
	addItem(item) {
		return fetch(`${API_BASE_URI}/items`, {
			method: 'POST',
			body: JSON.stringify(item),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	updateItem(id, updatedItem) {
		return fetch(`${API_BASE_URI}/items/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updatedItem),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	deleteItem(id) {
		return fetch(`${API_BASE_URI}/items/${id}`, {
			method: 'DELETE'
		});
	}

	getAll() {
		return fetch(`${API_BASE_URI}/items`)
			.then(response => response.json())
	}
}();

export default shouldUseExternalService
	? externalServiceStorage
	: localStorageStorage;