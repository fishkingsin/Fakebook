import { call, put } from 'redux-saga/effects';
import * as types from '~/store/actionTypes';
import { SDK } from '~/lib/sdk';


export function* getAlbums() {
	try {
		const albums = yield call(SDK.albums.getAlbums);
		yield put({ type: types.GET_ALBUMS_SUCCESS, payload: { albums } });
	} catch (error) {
		yield put({ type: types.GET_ALBUMS_FAILED, payload: { error } });
	}
};