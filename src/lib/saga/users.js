import { call, put } from 'redux-saga/effects';
import * as types from '~/store/actionTypes';
import { SDK } from '~/lib/sdk';

export function* getUsers() {
	try {
		const users = yield call(SDK.users.getUsers);
		yield put({ type: types.GET_USERS_SUCCESS, payload: { users } });
	} catch (error) {
		yield put({ type: types.GET_USERS_FAILED, payload: { error } });
	}
}
