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
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { GET_ALBUMS, GET_PHOTOS } from '../../store/actionTypes';

const tableCellHeight = 72;

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
		flex: 1 / 2,
		aspectRatio: 1,
	},
	cell: {
		flex: 1,
		margin: 5,
	},
	text: {
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
		position: 'absolute',
		bottom: 0,
		color: 'white',
		right: 0,
		left: 0,
		textAlign: 'center',
	},
});

class Albums extends Component {
	static navigationOptions = {
		tabBarLabel: 'Albums',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="picture-o"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'Albums',
	};
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		albums: PropTypes.array.isRequired,
		photos: PropTypes.array.isRequired,
		getAlbums: PropTypes.func.isRequired,
		getPhotos: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired,
	}

	constructor(props) {
		super(props);
		this.getAlbums = this.getAlbums.bind(this);
		this.getPhotos = this.getPhotos.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
	}

	componentWillMount() {
		this.getAlbums();
		this.getPhotos();
	}


	onPress = (id) => {
		console.log('this.props.navigation', this.props.navigation);
		this.props.navigation.push('Photos', {
			albumId: id,
		});
	}

	onRefresh = () => {
		this.getAlbums();
		this.getPhotos();
	}

	getAlbums = () => {
		this.props.getAlbums();
	}

	getPhotos = () => {
		this.props.getPhotos();
	}

	renderComponent = (item, index) => {
		const photo = _.find(this.props.photos, { albumId: item.id });
		return (
			<TouchableOpacity style={styles.cellContainer} onPress={() => { this.onPress(item.id); }}>
				<View style={[
					styles.cell,
				]}
				>
					{
						(photo !== undefined) && <FastImage
							style={{ flex: 1 }}
							source={{ uri: photo.thumbnailUrl }}
							resizeMode={FastImage.resizeMode.cover}
						/>
					}
					<Text style={styles.text} numberOfLines={1} >{ item.title }</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={styles.container} >
					<FlatList
						contentContainerStyle={styles.list}
						initialScrollIndex={0}
						numColumns={2}
						data={this.props.albums}
						keyExtractor={item => `${item.id}`}
						ref={(ref) => { this.flatListRef = ref; }}
						renderItem={({ item, index }) => this.renderComponent(item, index)}
						onRefresh={() => this.onRefresh()}
						refreshing={this.props.loading}
					/>
				</View>
			</SafeAreaView>
		);
	}
}
const mapStateToProps = (state) => ({
	albums: (state.albums.albums || []),
	photos: (state.photos.photos || []),
	loading: (state.albums.loading || false),
});
const mapActionsToProps = (dispatch) => ({
	getAlbums() {
		dispatch({ type: GET_ALBUMS });
	},
	getPhotos() {
		dispatch({ type: GET_PHOTOS });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Albums);
