import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { GET_USERS } from '../../store/actionTypes';

const tableCellHeight = 72;
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

class People extends Component {
	static navigationOptions = {
		tabBarLabel: 'People',
		tabBarIcon: ({ tintColor }) => (
			<Ionicons
				name="ios-people"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'People',
	};

	static propTypes = {
		users: PropTypes.array.isRequired,
		getUsers: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.getUsers = this.getUsers.bind(this);
	}

	getUsers = () => {
		this.props.getUsers();
	}

	renderComponent = (item) => (
		<View>
			<Text>{ JSON.stringify(item, null, 2) }</Text>
		</View>
	)

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>User tab</Text>
				<Button title="Get Users" onPress={this.getUsers} />
				<FlatList
					style={{ flex: 1, backgroundColor: 'skyblue' }}
					initialScrollIndex={0}
					data={this.props.users}
					keyExtractor={item => `${item.id}`}
					ref={(ref) => { this.flatListRef = ref; }}
					renderItem={({ item }) => this.renderComponent(item)}
					getItemLayout={(data, index) => ({
						length: tableCellHeight,
						offset: tableCellHeight * index,
						index,
					})}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	users: state.users.users,
});
const mapActionsToProps = (dispatch) => ({
	getUsers() {
		dispatch({ type: GET_USERS });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(People);

