import { call, put } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import { SDK } from '~/lib/sdk';

export function* getComments(action) {
	const { postId } = action.payload;
	try {
		const comments = yield call(SDK.comments.getComments, postId);
		const payload = { comments, postId };
		console.log(`getComments , ${JSON.stringify(payload, null, 2)}`);
		yield put({ type: types.GET_POST_COMMENTS_SUCCESS, payload });
	} catch (error) {
		yield put({ type: types.GET_POST_COMMENTS_FAILED, payload: { error } });
	}
}
