import { takeLatest, all } from 'redux-saga/effects';
import * as types from '~/store/actionTypes';
import * as posts from './posts';
import * as users from './users';
import * as photos from './photos';
import * as albums from './albums';

export function* watchGetPosts() {
	yield takeLatest(types.GET_POSTS, posts.getPosts);
}

export function* watchGetUsers() {
	yield takeLatest(types.GET_USERS, users.getUsers);
}

export function* watchGetPhotos() {
	yield takeLatest(types.GET_PHOTOS, photos.getPhotos);
}

export function* watchGetAlbums() {
	yield takeLatest(types.GET_ALBUMS, albums.getAlbums);
}

export default function* rootSaga() {
	yield all([
		watchGetPosts(),
		watchGetUsers(),
		watchGetPhotos(),
		watchGetAlbums(),
	]);
}
