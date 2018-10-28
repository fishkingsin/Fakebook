export default (callApi) => ({
	getComments(postId) {
		return callApi(
			'GET', '/comments',
			{
				params: { postId },
			},
		)
			.then((response) => Promise.resolve(response))
			.catch((res) => Promise.reject(res.message));
	},
});
