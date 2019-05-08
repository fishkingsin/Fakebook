import React, { Component } from 'react';
// import _ from 'lodash';
import { View } from 'react-native';
// import { NavigationActions } from 'react-navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppContainer } from './navigation';

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1, position: 'relative' }}>
					<AppContainer
						ref={(nav) => { this.navigation = nav; }}
					/>
				</View>
			</Provider>
		);
	}
}
