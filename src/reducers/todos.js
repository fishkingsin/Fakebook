import {
	GET_TODOS,
	GET_TODOS_SUCCESS,
	GET_TODOS_FAILED,
} from '../store/actionTypes';

const initialState = {
	todos: [],
	loading: false,
};

export const todos = (state = initialState, action) => {
	switch (action.type) {
		case GET_TODOS:
			return {
				...initialState,
				loading: true,
			};
		case GET_TODOS_SUCCESS:
			return {
				todos: action.payload.todos,
				loading: false,
			};
		case GET_TODOS_FAILED:
			return {
				todos: [],
				error: action.payload.error,
				loading: false,
			};
		default:
			return state;
	}
};
