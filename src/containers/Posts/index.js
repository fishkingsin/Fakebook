import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { GET_POSTS } from '../../store/actionTypes';

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

const tableCellHeight = 72;
class Posts extends Component {
	static navigationOptions = {
		tabBarLabel: 'Post',
		tabBarIcon: ({ tintColor }) => (
			<Ionicons
				name="ios-paper"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'Posts',
	};
	static propTypes = {
		posts: PropTypes.array.isRequired,
		getPosts: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.getPosts = this.getPosts.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (_.isEqual(nextProps.posts, this.props.posts)) {
			console.log('componentWillReceiveProps', nextProps.posts);
		}
	}

	getPosts = () => {
		this.props.getPosts();
	}

	renderComponent = (item) => (
		<View>
			<Text>{ JSON.stringify(item, null, 2) }</Text>
		</View>
	)

	render() {
		return (
			<View style={styles.container}>
				<Button title="Get Posts" onPress={this.getPosts} />
				<FlatList
					style={{ flex: 1, backgroundColor: 'skyblue' }}
					initialScrollIndex={0}
					data={this.props.posts}
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
	posts: state.posts.posts,
});
const mapActionsToProps = (dispatch) => ({
	getPosts() {
		dispatch({ type: GET_POSTS });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Posts);
