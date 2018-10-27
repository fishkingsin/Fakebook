import {
	GET_POSTS,
	GET_POSTS_SUCCESS,
	GET_POSTS_FAILED,
	GET_POST_COMMENTS_SUCCESS,
	GET_POST_COMMENTS_FAILED,
	GET_POST_COMMENTS,
} from '../store/actionTypes';
import _ from 'lodash';

const initialState = {
	posts: [],
	loading: false,
};

export const posts = (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return {
				...initialState,
				loading: true,
			};
		case GET_POSTS_SUCCESS:
			return {
				posts: action.payload.posts,
				loading: false,
			};
		case GET_POSTS_FAILED:
			return {
				posts: [],
				error: action.payload.error,
				loading: false,
			};
		case GET_POST_COMMENTS:
			return {
				...state,
				loading: false,
				posts: _.map(state.posts, (post) => {
					if (action.payload.postId === post.id) {
						return {
							...post,
							comments: [],
						};
					}
					return post;
				}),
			};
		case GET_POST_COMMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				posts: state.posts.map((post) => {
					if (action.payload.postId === post.id) {
						return {
							...post,
							comments: action.payload.comments,
						};
					}
					return post;
				}),
			};
		case GET_POST_COMMENTS_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};
