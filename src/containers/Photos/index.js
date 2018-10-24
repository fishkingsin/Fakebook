import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


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

export default class Photos extends Component {
	static navigationOptions = {
		tabBarLabel: 'Photos',
		tabBarIcon: ({ tintColor }) => (
			<Ionicons
				name="ios-image"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'Photos',
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>User tab</Text>
			</View>
		);
	}
}
