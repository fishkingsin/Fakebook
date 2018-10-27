import { call, put } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import { SDK } from '~/lib/sdk';

export function* getPosts() {
	try {
		const posts = yield call(SDK.posts.getPosts);
		yield put({ type: types.GET_POSTS_SUCCESS, payload: { posts } });
	} catch (error) {
		yield put({ type: types.GET_POSTS_FAILED, payload: { error } });
	}
}
