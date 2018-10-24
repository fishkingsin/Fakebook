import {
	GET_POSTS,
	GET_POSTS_SUCCESS,
	GET_POSTS_FAILED,
} from '~/store/actionTypes';

const initialState = {
	posts: [],
};

export const posts = (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return initialState;
		case GET_POSTS_SUCCESS:
			return {
				posts: action.payload.posts,
			};
		case GET_POSTS_FAILED:
			return {
				error: action.payload.error,
			};
		default:
			return state;
	}
};
