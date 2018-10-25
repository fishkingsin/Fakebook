import {
	GET_ALBUMS,
	GET_ALBUMS_SUCCESS,
	GET_ALBUMS_FAILED,
} from '~/store/actionTypes';

const initialState = {
	albums: [],
};

export const albums = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALBUMS:
			return initialState;
		case GET_ALBUMS_SUCCESS:
			return {
				albums: action.payload.albums,
			};
		case GET_ALBUMS_FAILED:
			return {
				error: action.payload.error,
			};
		default:
			return state;
	}
};
