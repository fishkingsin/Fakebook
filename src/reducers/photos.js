import {
	GET_PHOTOS,
	GET_PHOTOS_SUCCESS,
	GET_PHOTOS_FAILED,
} from '../store/actionTypes';

const initialState = {
	photos: [],
	loading: false,
};

export const photos = (state = initialState, action) => {
	switch (action.type) {
		case GET_PHOTOS:
			return {
				...initialState,
				loading: true,
			};
		case GET_PHOTOS_SUCCESS:
			return {
				photos: action.payload.photos,
				loading: false,
			};
		case GET_PHOTOS_FAILED:
			return {
				photo: [],
				error: action.payload.error,
				loading: false,
			};
		default:
			return state;
	}
};
