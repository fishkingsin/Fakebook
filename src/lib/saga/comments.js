import { call, put } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import { SDK } from '~/lib/sdk';

export function* getComments(action) {
	const { postId } = action.payload;
	try {
		const comments = yield call(SDK.comments.getComments, postId);
		yield put({ type: types.GET_POST_COMMENTS_SUCCESS, payload: { comments, postId } });
	} catch (error) {
		yield put({ type: types.GET_POST_COMMENTS_FAILED, payload: { error } });
	}
}
