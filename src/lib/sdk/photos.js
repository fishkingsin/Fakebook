export default (callApi) => ({
	getPhotos() {
		return callApi('GET', '/photos')
			.then((response) => Promise.resolve(response))
			.catch((res) => Promise.reject(res.message));
	},
});
