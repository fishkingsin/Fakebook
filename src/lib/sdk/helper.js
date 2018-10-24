export const jsonToURLEncoded = (element, parentKey, list = []) => {
	if (typeof (element) === 'object') {
		Object.keys(element).forEach((key) => {
			jsonToURLEncoded(element[key], parentKey ? `${parentKey}[${_.isArray(element) ? '' : key}]` : key, list);
		});
	} else {
		list.push(`${parentKey}=${encodeURIComponent(element)}`);
	}
	return list.join('&');
};

export const handleRequestData = (contentType, data) => {
	switch (contentType) {
		case 'application/x-www-form-urlencoded':
			return jsonToURLEncoded(data);
		default:
			return JSON.stringify(data);
	}
};