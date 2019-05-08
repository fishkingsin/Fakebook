import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
		justifyContent: 'flex-start',
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
	rowSeparator: {
		marginVertical: 5,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		height: 1,
	},
});

RkTheme.setType('RkButton', 'icon', {
	fontSize: 24,
	width: '100%',
	borderRadius: 25,
	color: 'white',
	fontColor: 'white',
	hitSlop: {
		top: 5, left: 5, bottom: 5, right: 5,
	},
});

class Detail extends Component {
	static navigationOptions = ({ navigation }) => ({
		tabBarLabel: 'Detail',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="Detail"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: navigation.getParam('name'),
	});

	static propTypes = {
		navigation: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props);
		this.props.navigation.setParams({
			name: props.user.name,
		});
	}

	renderCard = (item) => (
		<RkCard>
			<View
				rkCardHeader
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
				}}
			>
				<View style={{
					justifyContent: 'center',
					alignItems: 'center',
					margin: 5,
					width: 100,
					height: 100,
					borderRadius: 50,
					backgroundColor: 'rgba(0, 0, 0, 0.1)',
				}}
				>
					<Icon
						style={{ color: 'white' }}
						name="user"
						size={32}
					/>
				</View>
			</View>
			<View
				rkCardHeader
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
				}}
			>
				<Text>{this.props.user.name}</Text>
			</View>
			<View rkCardContent>
				<RkText rkType="header">User Name</RkText>
				<RkText rkType="cardText">
					{ `username: ${item.username}` }
				</RkText>
				<View
					style={[styles.rowSeparator]}
				/>
				<RkText rkType="header">Email</RkText>
				<RkText rkType="cardText">{ `${item.email}` }</RkText>
				<View
					style={[styles.rowSeparator]}
				/>
				<RkText rkType="header">Phone</RkText>
				<RkText rkType="cardText">{ `${item.phone}` }</RkText>
				<View
					style={[styles.rowSeparator]}
				/>
				<RkText rkType="header">Website</RkText>
				<RkText rkType="cardText">{ `${item.website}` }</RkText>
				<View
					style={[styles.rowSeparator]}
				/>
				<RkButton style={{ backgroundColor: 'gray' }} rkType="icon" onPress={() => { this.props.navigation.push('Address', { user: item }); }}>
					<Icon name="address-card" size={26} color="white" />
					<RkText rkType="accent" style={{ marginLeft: 10, color: 'white' }} >Address</RkText>
				</RkButton>
			</View>
		</RkCard>
	)

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					{
						this.renderCard(this.props.user)
					}
				</ScrollView>
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

