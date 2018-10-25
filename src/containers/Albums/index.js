import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { GET_ALBUMS, GET_PHOTOS } from '~/store/actionTypes';

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
		alignItems: 'center',
		margin: 5,
	},
});

class Albums extends Component {
	static navigationOptions = {
		tabBarLabel: 'Albums',
		tabBarIcon: ({ tintColor }) => (
			<Ionicons
				name="ios-albums"
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
	}

	constructor(props) {
		super(props);
		this.getAlbums = this.getAlbums.bind(this);
		this.getPhotos = this.getPhotos.bind(this);
	}

	componentWillMount() {
		this.getAlbums();
		this.getPhotos();
	}

	componentWillReceiveProps(nextProps) {
		if (_.isEqual(nextProps.albums, this.props.albums)) {
			// console.log('componentWillReceiveProps', nextProps.albums);
		}
	}


	onPress = (id) => {
		console.log('this.props.navigation', this.props.navigation);
		this.props.navigation.navigate('Photos', {
			albumId: id,
		});
	}

	getAlbums = () => {
		this.props.getAlbums();
	}

	getPhotos = () => {
		this.props.getPhotos();
	}

	renderComponent = (item, index) => (
		<TouchableOpacity style={styles.cellContainer} onPress={() => { this.onPress(item.id); }}>
			<View style={[
				styles.cell,
				{ backgroundColor: (index % 2 === 0) ? 'skyblue' : 'powderblue' },
			]}
			>
				<Text>{ item.title }</Text>
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
						numColumns={2}
						data={this.props.albums}
						keyExtractor={item => `${item.id}`}
						ref={(ref) => { this.flatListRef = ref; }}
						renderItem={({ item, index }) => this.renderComponent(item, index)}
					/>
				</View>
			</SafeAreaView>
		);
	}
}
const mapStateToProps = (state) => ({
	albums: state.albums.albums,
	photos: state.photos.photos,
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
