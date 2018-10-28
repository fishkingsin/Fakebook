import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from 'react-navigation';
import * as containers from '~cont/*/index.js';

const SimpleTabs = createBottomTabNavigator(
	{
		People: {
			screen: containers.People,
			path: 'cart',
		},
		Albums: {
			screen: containers.Albums,
			path: 'albums',
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
	},
);
class SimpleTabsContainer extends React.Component {
	static router = SimpleTabs.router;
	static propTypes = {
		navigation: PropTypes.object.isRequired,
	}

	componentDidMount() {
		this.s0 = this.props.navigation.addListener('willFocus', this.onAction);
		this.s1 = this.props.navigation.addListener('didFocus', this.onAction);
		this.s2 = this.props.navigation.addListener('willBlur', this.onAction);
		this.s3 = this.props.navigation.addListener('didBlur', this.onAction);
	}
	componentWillUnmount() {
		this.s0.remove();
		this.s1.remove();
		this.s2.remove();
		this.s3.remove();
	}
	onAction = a => {
		console.log('TABS EVENT', a.type, a);
	};
	render() {
		return <SimpleTabs navigation={this.props.navigation} />;
	}
}

export default SimpleTabsContainer;
