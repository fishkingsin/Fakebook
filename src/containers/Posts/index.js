import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import {
	RkButton,
	RkText,
	RkCard,
	RkTheme,
} from 'react-native-ui-kitten';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { GET_POSTS, GET_POST_COMMENTS } from '../../store/actionTypes';
import Comments from '../../components/Comments';

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

	componentWillMount() {
		this.props.getPosts();
	}

	onPress = () => {
		console.log('this.props.navigation', this.props.navigation);
		this.props.navigation.navigate('Detail');
	}

	getPosts = () => {
		this.props.getPosts();
	}

	renderComponent = (post, index) => (
		<RkCard>
			<View rkCardHeader>
				<View>
					<RkText rkType="header">{ post.title }</RkText>
					{/* <RkText rkType="subtitle">Subtitle</RkText> */}
				</View>
			</View>
			<View rkCardContent>
				<RkText rkType="cardText">
					{ post.body }
				</RkText>
			</View>
			<View rkCardFooter>
				<Comments postId={post.id} />
			</View>
		</RkCard>
	)

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
