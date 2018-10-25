import {
	GET_PHOTOS,
	GET_PHOTOS_SUCCESS,
	GET_PHOTOS_FAILED,
} from '~/store/actionTypes';

const initialState = {
	photos: [],
};

export const photos = (state = initialState, action) => {
	switch (action.type) {
		case GET_PHOTOS:
			return initialState;
		case GET_PHOTOS_SUCCESS:
			return {
				photos: action.payload.photos,
			};
		case GET_PHOTOS_FAILED:
			return {
				error: action.payload.error,
			};
		default:
			return state;
	}
};
