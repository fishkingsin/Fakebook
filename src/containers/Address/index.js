import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GET_USERS } from '../../store/actionTypes';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	scrollview: {
		alignItems: 'center',
		paddingVertical: 40,
	},
	map: {
		width,
		height,
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

const markers = [
	{
		lat: -37.3159,
		lng: 81.1496,
	},
	{
		lat: -43.9509,
		lng: -34.4618,
	},
	{
		lat: -68.6102,
		lng: -47.0653,
	},
	{
		lat: 29.4572,
		lng: -164.2990,
	},
	{
		lat: -31.8129,
		lng: 62.5342,
	},
	{
		lat: -71.4197,
		lng: 71.7478,
	},
	{
		lat: 24.8918,
		lng: 21.8984,
	},
	{
		lat: -14.3990,
		lng: -120.7677,
	},
	{
		lat: 24.6463,
		lng: -168.8889,
	},
	{
		lat: -38.2386,
		lng: 57.2232,
	},
];
class Address extends Component {
	static navigationOptions = ({ navigation }) => ({
		tabBarLabel: 'Address',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name="address"
				size={26}
				style={{ color: tintColor }}
			/>
		),
		title: navigation.getParam('city'),
	});
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props);
		this.props.navigation.setParams({
			city: this.props.user.address.city,
		});
		this.state = {
			region: {
				latitude: parseFloat(this.props.user.address.geo.lat),
				longitude: parseFloat(this.props.user.address.geo.lng),
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			},
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					style={StyleSheet.absoluteFill}
					contentContainerStyle={styles.scrollview}
				>
					<MapView
						initialRegion={this.state.region}
						style={styles.map}
						scrollEnabled
						zoomEnabled
						pitchEnabled
						rotateEnabled={false}
					>
						{<Marker
							title={this.props.user.name}
							description={this.props.user.address.city}
							coordinate={this.state.region}
						/>}
					</MapView>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: ownProps.navigation.getParam('user'),
});
const mapActionsToProps = (dispatch) => ({
	getUsers(userId) {
		dispatch({ type: GET_USERS, payload: { id: userId } });
	},
});

export default connect(mapStateToProps, mapActionsToProps)(Address);

