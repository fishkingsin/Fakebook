import React, { Component } from 'react';
import {
	StyleSheet,
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
import { GET_POST_COMMENTS } from '../../store/actionTypes';

const styles = StyleSheet.create({
	screen: {
		backgroundColor: '#f0f1f5',
		padding: 12,
	},
	buttonIcon: {
		marginRight: 7,
		fontSize: 19.7,
	},
	footer: {
		marginHorizontal: 16,
	},
	avatar: {
		width: 42,
		height: 42,
		borderRadius: 21,
		marginRight: 17,
	},
	dot: {
		fontSize: 6.5,
		color: '#0000008e',
		marginLeft: 2.5,
		marginVertical: 10,
	},
	floating: {
		width: 56,
		height: 56,
		position: 'absolute',
		zIndex: 200,
		right: 16,
		top: 173,
	},
	footerButtons: {
		flexDirection: 'row',
	},
	overlay: {
		justifyContent: 'flex-end',
		paddingVertical: 23,
		paddingHorizontal: 16,
	},
});
const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];

class Comment extends Component {
	static propTypes = {
		getPostComments: PropTypes.func.isRequired,
		postId: PropTypes.number.isRequired,
		comments: PropTypes.array.isRequired,
	}

	componentWillMount() {
		this.props.getPostComments(this.props.postId);
	}

	render() {
		return (
			<RkButton rkType="clear link">
				<Icon name="comment" style={iconButton} size={26} />
				<RkText rkType="hint">{`${this.props.comments.length} Comments`}</RkText>
			</RkButton>
		);
	}
}


const mapStateToProps = (state, ownPorps) => {
	const post = _.find(state.posts.posts, { id: ownPorps.postId });
	const c = post ? post.comments : [];
	return {
		comments: (c || []),
	};
};
const mapActionsToProps = (dispatch) => ({
	getPostComments(postId) {
		dispatch({ type: GET_POST_COMMENTS, payload: { postId } });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Comment);
