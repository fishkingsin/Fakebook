import { call, put } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import { SDK } from '~/lib/sdk';

export function* getPhotos() {
	try {
		const photos = yield call(SDK.photos.getPhotos);
		yield put({ type: types.GET_PHOTOS_SUCCESS, payload: { photos } });
	} catch (error) {
		yield put({ type: types.GET_PHOTOS_FAILED, payload: { error } });
	}
}
