import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
	RkButton,
	RkText,
	RkCard,
	RkTheme,
} from 'react-native-ui-kitten';

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
class Detail extends Component {
	static navigationOptions = {
		tabBarLabel: 'Detail',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="Detail"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'Detail',
	};

	static propTypes = {
		navigation: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
	}

	renderCard = (item) => (
		<RkCard>
			<View rkCardHeader>
				<View>
					<RkText rkType="header">{ item.name }</RkText>
					{/* <RkText rkType="subtitle">Subtitle</RkText> */}
				</View>
			</View>
			<View rkCardContent>

				<RkText rkType="cardText">
					{ `username: ${item.username}` }
				</RkText>
				<RkText rkType="header">Email</RkText>
				<RkText rkType="cardText">{ `${item.email}` }</RkText>
				<RkText rkType="header">Phone</RkText>
				<RkText rkType="cardText">{ `${item.phone}` }</RkText>
				<RkText rkType="header">Website</RkText>
				<RkText rkType="cardText">{ `${item.website}` }</RkText>

				<RkButton rkType="clear link" onPress={() => { this.navigation.navigate('Address', { user: item }); }}>
					<RkText rkType="accent">Address</RkText>
				</RkButton>
				{/* "phone": "1-770-736-8031 x56442",
				"website": "hildegard.org",
				"company": {
					"name": "Romaguera-Crona",
					"catchPhrase": "Multi-layered client-server neural-net",
					"bs": "harness real-time e-markets"
				} */}
			</View>
		</RkCard>
	)

	render() {
		return (
			<View style={styles.container}>
				{
					this.renderCard(this.props.user)
				}
			</View>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: ownProps.navigation.getParam('user'),
	users: state.users.users,
});
const mapActionsToProps = (dispatch) => ({
	getUsers(userId) {
		dispatch({ type: GET_USERS, payload: { id: userId } });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Detail);

