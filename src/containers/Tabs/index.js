import {
	NavigationScreenProp,
	NavigationEventSubscription,
} from 'react-navigation';
import React from 'react';
import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView, createBottomTabNavigator } from 'react-navigation';
import * as containers from '~cont/*/index.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SimpleTabs = createBottomTabNavigator(
{
	Home: {
		screen: containers.Home,
		path: '',
	},
	People: {
		screen: containers.People,
		path: 'cart',
	},
	Photos: {
		screen: containers.Photos,
		path: 'photos',
	},
	Posts: {
		screen: containers.Posts,
		path: 'posts',
	},
	ToDos: {
		screen: containers.Todos,
		path: 'todos',
	},
},
{
	tabBarOptions: {
		activeTintColor: '#e91e63',
		inactiveTintColor: 'gray',
	},
}
);


class SimpleTabsContainer extends React.Component {
	static router = SimpleTabs.router;
	
	componentDidMount() {
		this._s0 = this.props.navigation.addListener('willFocus', this._onAction);
		this._s1 = this.props.navigation.addListener('didFocus', this._onAction);
		this._s2 = this.props.navigation.addListener('willBlur', this._onAction);
		this._s3 = this.props.navigation.addListener('didBlur', this._onAction);
	}
	componentWillUnmount() {
		this._s0.remove();
		this._s1.remove();
		this._s2.remove();
		this._s3.remove();
	}
	_onAction = a => {
		console.log('TABS EVENT', a.type, a);
	};
	render() {
		return <SimpleTabs navigation={this.props.navigation} />;
	}
}

export default SimpleTabsContainer;
