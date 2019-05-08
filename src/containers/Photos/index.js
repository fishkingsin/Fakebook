import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import { GET_PHOTOS } from '../../store/actionTypes';

const NUM_COLUMN = 4;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	list: {
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
	cellContainer: {
		flex: 1 / NUM_COLUMN,
		aspectRatio: 1,
	},
	cell: {
		flex: 1,
		margin: 1,
	},
});

class Photos extends Component {
	static navigationOptions = {
		tabBarLabel: 'Photos',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="photos"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'Photos',
	};
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		photos: PropTypes.array.isRequired,
		getPhotos: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.getPhotos = this.getPhotos.bind(this);
		this.getPhotos();
	}

	componentWillMount() {
		this.getPhotos();
	}


	onPress = (index) => {
		console.log('this.props.navigation', this.props.navigation);
		this.props.navigation.push('Preview', {
			photos: this.props.photos,
			initialRenderIndex: index,
		});
	}

	getPhotos = () => {
		this.props.getPhotos();
	}

	renderComponent = (item, index) => (

		<TouchableOpacity style={styles.cellContainer} onPress={() => { this.onPress(index); }}>
			<View style={[
				styles.cell,
				{ backgroundColor: 'gray' },
			]}
			>
				<FastImage
					style={{ flex: 1 }}
					source={{ uri: item.thumbnailUrl }}
					resizeMode={FastImage.resizeMode.cover}
				/>
			</View>
		</TouchableOpacity>
	)

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={styles.container} >
					<FlatList
						contentContainerStyle={styles.list}
						initialScrollIndex={0}
						numColumns={NUM_COLUMN}
						data={this.props.photos}
						keyExtractor={item => `${item.id}`}
						ref={(ref) => { this.flatListRef = ref; }}
						renderItem={({ item, index }) => this.renderComponent(item, index)}
					/>
				</View>
			</SafeAreaView>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	const albumId = ownProps.navigation.getParam('albumId');
	return {
		photos: _.filter(state.photos.photos, { albumId }),
	};
};
const mapActionsToProps = (dispatch) => ({
	getPhotos() {
		dispatch({ type: GET_PHOTOS });
	},
});
export default connect(mapStateToProps, mapActionsToProps)(Photos);
