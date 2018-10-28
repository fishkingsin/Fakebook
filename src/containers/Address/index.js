import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
	RkButton,
	RkText,
	RkCard,
	RkTheme,
} from 'react-native-ui-kitten';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GET_USERS } from '../../store/actionTypes';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
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
class Address extends Component {
	static navigationOptions = {
		tabBarLabel: 'Address',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="address"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'Address',
	};

	static propTypes = {
		user: PropTypes.object.isRequired,
	}
	/*
	"address": {
		"street": "Kulas Light",
		"suite": "Apt. 556",
		"city": "Gwenborough",
		"zipcode": "92998-3874",
		"geo": {
		"lat": "-37.3159",
		"lng": "81.1496"
		}
	},
	*/
	render() {
		return (
			<View style={styles.container}>
				<MapView
					initialRegion={{
						latitude: this.props.user.address.geo.lat,
						longitude: this.props.user.address.geo.lng,
					}}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: ownProps.navigation.getParam('user'),
});
const mapActionsToProps = (dispatch) => ({
	getUsers(userId) {
		dispatch({ type: GET_USERS, payload: { id: userId } });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Address);

