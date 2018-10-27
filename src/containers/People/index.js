import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { GET_USERS } from '../../store/actionTypes';

const tableCellHeight = 72;
const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	cell: {
		height: tableCellHeight,
		flex: 1,
	},
});

class People extends Component {
	static navigationOptions = {
		tabBarLabel: 'User',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="user"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'User',
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

	renderComponent = (item, index) => (
		<View style={[
			styles.cell,
			{ backgroundColor: (index % 2 === 0) ? 'skyblue' : 'powderblue' },
		]}
		>
			<Text style={{ flex: 1 }}>{ item.name }</Text>
		</View>
	)

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					initialScrollIndex={0}
					numColumns={1}
					data={this.props.users}
					keyExtractor={item => `${item.id}`}
					ref={(ref) => { this.flatListRef = ref; }}
					renderItem={({ item, index }) => this.renderComponent(item, index)}
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

