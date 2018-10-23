import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { reducer as form } from 'redux-form';
import { app } from '~/reducers/app';


export const reducer = persistCombineReducers({ key: 'root', storage }, {
	app,
});
