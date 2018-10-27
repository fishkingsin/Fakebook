import {
	GET_USERS,
	GET_USERS_SUCCESS,
	GET_USERS_FAILED,
} from '../store/actionTypes';

const initialState = {
	users: [],
};

export const users = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return initialState;
		case GET_USERS_SUCCESS:
			return {
				users: action.payload.users,
			};
		case GET_USERS_FAILED:
			return {
				error: action.payload.error,
			};
		default:
			return state;
	}
};
