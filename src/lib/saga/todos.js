import { call, put } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import { SDK } from '~/lib/sdk';

export function* getTodos() {
	try {
		const todos = yield call(SDK.todos.getTodos);
		yield put({ type: types.GET_TODOS_SUCCESS, payload: { todos } });
	} catch (error) {
		yield put({ type: types.GET_TODOS_FAILED, payload: { error } });
	}
}
