import { Platform } from 'react-native';
import { config } from '~/config';

export const callApi = (method, url, callCfg = {}) => {
	const {
        baseUrl = config.urls.api,
        headers,
		...otherCfg
	} = callCfg;
	const reqCfg = {
		method,
		headers: {
			'content-type': url.startsWith('/d/') ? 'application/x-www-form-urlencoded' : 'application/json',
			...headers,
		},
		...otherCfg,
	};
	
	if (data !== null) {
		reqCfg.body = handleRequestData(reqCfg.headers['content-type'], data);
	}
	const query = (params !== null) ? `?${jsonToURLEncoded(params)}` : '';
	// console.log('here callApi config', `${baseUrl}${url}${query}`, reqCfg);
	return fetch(`${baseUrl}${url}${query}`, reqCfg)
		.then(async (res) => {
			// console.log('here callApi', url, ' result', res);
			const responseText = await res.text();
			// console.log('here callApi', url, ' responseText', responseText);
			const responseJson = responseText ? JSON.parse(responseText) : '';
			if (!res.ok) {
				return Promise.reject(responseJson);
			}
			return responseJson;
		});
};