import {
	GET_ALBUMS,
	GET_ALBUMS_SUCCESS,
	GET_ALBUMS_FAILED,
} from '../store/actionTypes';

const initialState = {
	albums: [],
	loading: false,
};

export const albums = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALBUMS:
			return {
				...initialState,
				loading: true,
			};
		case GET_ALBUMS_SUCCESS:
			return {
				albums: action.payload.albums,
				loading: false,
			};
		case GET_ALBUMS_FAILED:
			return {
				albums: [],
				error: action.payload.error,
				loading: false,
			};
		default:
			return state;
	}
};
