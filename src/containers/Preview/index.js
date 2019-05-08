import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import { GET_PHOTOS } from '../../store/actionTypes';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000',
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
		flex: 1,
		width,
	},
	list: {

	},
	text: {
		color: '#FFFFFF',
		backgroundColor:
		'rgba(52, 52, 52, 0.8)',
		// flex: 0.1,
		position: 'absolute',
		bottom: 20,
		left: 10,
		right: 10,
		textAlign: 'center',
	},
});

class Preview extends Component {
	static navigationOptions = {
		tabBarLabel: 'Preview',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="Preview"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: 'Preview',
	};
	static propTypes = {
		data: PropTypes.array.isRequired,
		initialRenderIndex: PropTypes.number.isRequired,

	};

	static defaultProps = {

	};

	constructor(props) {
		super(props);
		this.renderComponent = this.renderComponent.bind(this);
		this.state = {
			index: props.initialRenderIndex,
			data: props.data,
		};
	}

	renderComponent = (item, index) => (
		<View style={[
			styles.cell,
		]}
		>
			<FastImage
				style={{ flex: 0.9 }}
				source={{ uri: item.url }}
				resizeMode={FastImage.resizeMode.contain}
			/>
			<Text style={styles.text} >{ item.title }</Text>
		</View>
	)

	render() {
		return (
			<View style={styles.container} >
				<FlatList
					contentContainerStyle={styles.list}
					initialScrollIndex={this.state.index}
					numColumns={1}
					pagingEnabled
					horizontal
					data={this.state.data}
					keyExtractor={item => `${item.id}`}
					ref={(ref) => { this.flatListRef = ref; }}
					renderItem={({ item, index }) => this.renderComponent(item, index)}
					getItemLayout={(data, index) => ({
						length: width,
						offset: width * index,
						index,
					})}
				/>
			</View>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
	data: ownProps.navigation.getParam('photos'),
	initialRenderIndex: ownProps.navigation.getParam('initialRenderIndex'),
});
const mapActionsToProps = (dispatch) => ({
	getPhotos() {
		dispatch({ type: GET_PHOTOS });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Preview);
