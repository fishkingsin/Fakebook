export default (callApi) => ({
	getPosts() {
		return callApi('GET', '/posts')
			.then((response) => Promise.resolve(response))
			.catch((res) => Promise.reject(res.message));
	},
});
