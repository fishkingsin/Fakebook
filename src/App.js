import React, { Component } from 'react';
import _ from 'lodash';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '~/store/store';
import { RootStack } from '~/navigation';
import { NavigationActions } from 'react-navigation';
export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1, position: 'relative' }}>
					<RootStack
						ref={(nav) => { this.navigation = nav; }}
					/>
				</View>
			</Provider>
		);
	}
}
