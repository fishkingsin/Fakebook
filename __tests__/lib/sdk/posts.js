/* global describe test expect jest */
import sdkCreator from '~/lib/sdk/posts';

describe('SDK posts', () => {
	describe('getPosts', () => {
		test('CASE 1: returns array of posts', async () => {
			const callApi = jest.fn(() => Promise.resolve({}));
			const postsSDK = sdkCreator(callApi);
			await expect(postsSDK.getPosts())
				.resolves
				.toEqual([]);
		});
	});
});
