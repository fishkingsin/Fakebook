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
	rowSeparator: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		height: 1,
	},
});

const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];


class Post extends Component {
	static navigationOptions = ({ navigation }) => ({
		tabBarLabel: 'Post',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="newspaper-o"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: navigation.getParam('title'),
	});
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		post: PropTypes.object,
		comments: PropTypes.array,
		getPost: PropTypes.func.isRequired,
		getComments: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired,
	}

	static defaultProps = {
		post: {},
		comments: [],
	}

	constructor(props) {
		super(props);
		this.getPost = this.getPost.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
		this.props.navigation.setParams({
			title: props.post.title,
		});
	}

	componentWillMount() {
		this.props.getPost();
		this.getComments(this.props.post.id);
	}

	componentWillReceiveProps(nextProps) {
		if (_.isEqual(nextProps.post, this.props.post)) {
			this.getComments(nextProps.post.id);
		}
	}

	onPress = () => {
		console.log('this.props.navigation', this.props.navigation);
		this.props.navigation.navigate('Detail');
	}

	onRefresh = () => {
		this.getPost();
	}

	getPost = () => {
		this.props.getPost();
	}

	getComments = (id) => {
		this.props.getComments(id);
	}

	renderComponent = (comment, index) => (
		<RkCard>
			<View rkCardHeader>
				<View>
					<RkText rkType="header">{ comment.name }</RkText>
					<RkText rkType="subtitle">{ comment.email }</RkText>
				</View>
			</View>
			<View rkCardContent>
				<RkText rkType="cardText">
					{ comment.body }
				</RkText>
			</View>
		</RkCard>
	)
	renderSeparator = (highlighted) => (
		<View
			style={[styles.rowSeparator, { opacity: highlighted ? 0.0 : 1.0 }]}
		/>
	);

	render() {
		return (
			<View style={styles.container}>
				<RkCard>
					<View rkCardHeader>
						<View>
							<RkText rkType="header">{ this.props.post.title }</RkText>
							{/* <RkText rkType="subtitle">Subtitle</RkText> */}
						</View>
					</View>
					<View rkCardContent>
						<RkText rkType="cardText">
							{ this.props.post.body }
						</RkText>
					</View>
				</RkCard>
				<FlatList
					style={{ flex: 1 }}
					initialScrollIndex={0}
					data={this.props.post.comments}
					keyExtractor={item => `${item.id}`}
					ref={(ref) => { this.flatListRef = ref; }}
					renderItem={({ item, index }) => this.renderComponent(item, index)}
					getItemLayout={(data, index) => ({
						length: tableCellHeight,
						offset: tableCellHeight * index,
						index,
					})}
					ItemSeparatorComponent={this.renderSeparator}
					ListHeaderComponent={<RkText rkType="cardText">Comments</RkText>}
					onRefresh={() => this.onRefresh()}
					refreshing={this.props.loading}
				/>
			</View>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	const ownpropspost = ownProps.navigation.getParam('post');
	const statepost = _.find(state.posts.posts, { id: ownpropspost.id });
	const post = (statepost || ownpropspost);
	return {
		post,
		loading: (statepost === undefined || state.posts.loading),
	};
};
const mapActionsToProps = (dispatch) => ({
	getPost() {
		dispatch({ type: GET_POSTS });
	},
	getComments(postId) {
		dispatch({ type: GET_POST_COMMENTS, payload: { postId } });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Post);
