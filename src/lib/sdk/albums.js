export default (callApi) => ({
	getAlbums() {
		return callApi('GET', '/albums')
			.then((response) => Promise.resolve(response))
			.catch((res) => Promise.reject(res.message));
	},
});
