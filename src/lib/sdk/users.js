export default (callApi) => ({
	getUsers() {
		return callApi('GET', '/users')
			.then((response) => Promise.resolve(response))
			.catch((res) => Promise.reject(res.message));
	},
});
