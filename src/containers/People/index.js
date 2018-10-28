import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { GET_USERS } from '../../store/actionTypes';
import { Avatar } from '../../components/avatar';

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
		marginBottom: 2,
		height: tableCellHeight,
		flex: 1,
	},
	rowSeparator: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		height: 1,
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
		navigation: PropTypes.object.isRequired,
		users: PropTypes.array.isRequired,
		getUsers: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.getUsers = this.getUsers.bind(this);
	}

	componentWillMount() {
		this.getUsers();
	}

	onPress = (id, item) => {
		this.props.navigation.push('Detail', {
			userId: id,
			user: item,
		});
	}

	getUsers = () => {
		this.props.getUsers();
	}

	renderComponent = (item, index) => (
		<TouchableOpacity style={styles.cellContainer} onPress={() => { this.onPress(item.id, item); }}>
			<View style={[
				styles.cell,
			]}
			>
				<View style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignContent: 'center',
				}}
				>
					<View style={{
						marginLeft: 10,
						flex: 0.9,
						justifyContent: 'space-around',
						alignContent: 'center',
					}}
					>
						<Avatar
							name={item.name}
							description={item.email}
						/>
						{/* <Text style={{ fontSize: 26 }}>
							{ item.name }
						</Text> */}
					</View>
					<View style={{
						marginRight: 10,
						flex: 0.1,
						justifyContent: 'space-around',
						alignContent: 'center',
					}}>	
						<Icon name="caret-right" size={26} />
					</View>
				</View>
				<View
					style={[styles.rowSeparator]}
				/>
			</View>
		</TouchableOpacity>
	)

	renderSeparator = (highlighted) => (
		<View
			style={[styles.rowSeparator,
				{ opacity: highlighted ? 0.0 : 1.0 }]}
		/>
	);

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
					ItemSeparatorComponent={this.renderSeparator}
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

