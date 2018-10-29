import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	RkText,
	RkCard,
	RkTheme,
} from 'react-native-ui-kitten';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { GET_POSTS, GET_USERS } from '../../store/actionTypes';
import { Avatar } from '../../components/avatar';

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
	cell: {
		height: tableCellHeight,
		flex: 1,
	},
	rowSeparator: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		height: 1,
	},
});

const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];


class Posts extends Component {
	static navigationOptions = {
		tabBarLabel: 'Post',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="newspaper-o"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'Posts',
	};
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		posts: PropTypes.array.isRequired,
		getPosts: PropTypes.func.isRequired,
		getUsers: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired,
	}

	constructor(props) {
		super(props);
		this.getPosts = this.getPosts.bind(this);
		this.getUsers = this.getUsers.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
	}

	componentWillMount() {
		this.props.getPosts();
		this.props.getUsers();
	}

	onPress = (post) => {
		this.props.navigation.navigate('Post', { post });
	}

	onRefresh = () => {
		this.getPosts();
	}

	getPosts = () => {
		this.props.getPosts();
	}
	getUsers = () => {
		this.props.getUsers();
	}

	renderComponent = (post, index) => (
		<TouchableWithoutFeedback onPress={() => { this.onPress(post); }}>
			<RkCard>
				<View rkCardHeader>
					<View style={{
						flex: 1,
						justifyContent: 'space-around',
						alignContent: 'center',
					}}
					>
						{
							(post.user !== undefined) && <Avatar
								name={post.user.name}
							/>
						}
					</View>
				</View>
				<View rkCardHeader>
					<View>
						<RkText rkType="header">{ post.title }</RkText>
					</View>
				</View>
				<View rkCardContent>
					<RkText rkType="cardText">
						{ post.body }
					</RkText>
				</View>
			</RkCard>
		</TouchableWithoutFeedback>
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
					style={{ flex: 1 }}
					initialScrollIndex={0}
					data={this.props.posts}
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
	posts: _.flatMap(state.posts.posts, (post) => ({
		...post,
		user: _.find(state.users.users, { id: post.userId }),
	})),
	loading: state.posts.loading,
});
const mapActionsToProps = (dispatch) => ({
	getPosts() {
		dispatch({ type: GET_POSTS });
	},
	getUsers() {
		dispatch({ type: GET_USERS });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Posts);
