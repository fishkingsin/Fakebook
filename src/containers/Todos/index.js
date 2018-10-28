import React, { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { List, ListItem, CheckBox } from 'react-native-elements';
import {
	RkButton,
	RkText,
	RkCard,
	RkTheme,
} from 'react-native-ui-kitten';
import _ from 'lodash';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GET_TODOS, GET_USERS } from '../../store/actionTypes';

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

class Todos extends Component {
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

	static propTypes = {
		// navigation: PropTypes.object.isRequired,
		getTodos: PropTypes.func.isRequired,
		getUsers: PropTypes.func.isRequired,
		todos: PropTypes.array.isRequired,
		users: PropTypes.array.isRequired,
		loading: PropTypes.bool.isRequired,
	}

	constructor(props) {
		super(props);
		const checked = new Map();
		this.props.todos.forEach((d) => {
			checked.set(d.id, d.completed);
		});
		this.state = {
			checked,
		};
		this.onRefresh = this.onRefresh.bind(this);
	}

	componentWillMount() {
		this.getTodos();
		this.getUsers();
	}

	componentWillReceiveProps(nextProps) {
		if (_.isEqual(nextProps.todos, this.props.todos)) {
			const checked = new Map();
			this.props.todos.forEach((d) => {
				checked.set(d.id, d.completed);
			});
			this.setState({
				checked,
			});
		}
	}

	onRefresh = () => {
		this.getUsers();
		this.getTodos();
	}

	getTodos = () => {
		this.props.getTodos();
	}

	getUsers = () => {
		this.props.getUsers();
	}

	renderComponent = (item, index) => (
		<CheckBox
			onPress={() => {
				this.setState((state) => {
					const checked = new Map(state.checked);
					checked.set(item.id, !checked.get(item.id));
					return { checked };
				});
			}}
			left
			checkedIcon="check-circle-o"
			uncheckedIcon="circle-o"
			checkedColor="blue"
			uncheckedColor="gray"
			title={item.title}
			subtitle={() => {
				const d = _.find(this.props.users, { id: item.userId }).name;
				console.log('d', d);
				return 'Hello';
			}}
			checked={this.state.checked.get(item.id)}
		/>
	)
	renderSeparator = (highlighted) => (
		<View
			style={[styles.rowSeparator, { opacity: highlighted ? 0.0 : 1.0 }]}
		/>
	);

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					initialScrollIndex={0}
					data={this.props.todos}
					keyExtractor={item => `${item.id}`}
					ref={(ref) => { this.flatListRef = ref; }}
					renderItem={({ item, index }) => this.renderComponent(item, index)}
					getItemLayout={(data, index) => ({
						length: tableCellHeight,
						offset: tableCellHeight * index,
						index,
					})}
					ItemSeparatorComponent={this.renderSeparator}
					onRefresh={() => this.onRefresh()}
					refreshing={this.props.loading}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	users: state.users.users,
	todos: state.todos.todos,
	loading: state.posts.loading,
});
const mapActionsToProps = (dispatch) => ({
	getTodos() {
		dispatch({ type: GET_TODOS });
	},
	getUsers() {
		dispatch({ type: GET_USERS });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Todos);

