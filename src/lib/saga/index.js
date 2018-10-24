import { takeLatest, all } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import * as posts from './posts';
import * as users from './users';

export function* watchGetPosts() {
	yield takeLatest(types.GET_POSTS, posts.getPosts);
}

export function* watchGetUsers() {
	yield takeLatest(types.GET_USERS, users.getUsers);
}

export default function* rootSaga() {
	yield all([
		watchGetPosts(),
		watchGetUsers(),
	]);
}
