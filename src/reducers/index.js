import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
// import { reducer as form } from 'redux-form';
import { app } from '~/reducers/app';
import { posts } from '~/reducers/posts';
import { users } from '~/reducers/users';
import { photos } from '~/reducers/photos';
import { albums } from '~/reducers/albums';


export const reducer = persistCombineReducers({ key: 'root', storage }, {
	app,
	posts,
	users,
	photos,
	albums,
});
