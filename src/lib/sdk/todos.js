export default (callApi) => ({
	getTodos() {
		return callApi('GET', '/todos')
			.then((response) => Promise.resolve(response))
			.catch((res) => Promise.reject(res.message));
	},
});
