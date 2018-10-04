import {
	API_BASE_URI
} from '../config';
import {
	shouldUseExternalService
} from '../utils';

const defaultValues = new class LocalStorageStorage {
	get = () => Promise.resolve({
		author: 'Michal Michalczuk',
		email: 'michalczukm@gmail.com',
		webpage: 'https://michalczukm.xyz',
		twitterName: 'michalczukm'
	})
}();

const externalServiceStorage = new class ExternalServiceStorage {
	get() {
		return fetch(`${API_BASE_URI}/contact`)
			.then(response => response.json())
	}
}();

export default shouldUseExternalService
	?
	externalServiceStorage :
	defaultValues;