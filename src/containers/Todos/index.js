import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

export default class Todos extends Component {
	static navigationOptions = {
		tabBarLabel: 'Todos',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="clipboard"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'TODO',
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>User tab</Text>
			</View>
		);
	}
}
