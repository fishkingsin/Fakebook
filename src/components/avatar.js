import React, { Component } from 'react';
import {
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RkComponent, RkText } from 'react-native-ui-kitten';

export class Avatar extends RkComponent {
	componentName = 'Avatar';
	typeMapping = {
		container: {},
		image: {},
		username: {},
		description: {},
	};

	render() {
		const {
			container,
			username,
			description: descriptionStyle,
		} = this.defineStyles();
		const description = this.props.description
			? (<RkText style={descriptionStyle}>{this.props.description}</RkText>) :
			<View />;

		return (
			<View style={[container, { flexDirection: 'row' }]}>
				<View style={{
					justifyContent: 'center',
        			alignItems: 'center',
					margin: 5,
					width: 50,
					height: 50,
					borderRadius: 25,
					backgroundColor: 'rgba(0, 0, 0, 0.1)',
				}}
				>
					<Icon
						style={{ color: 'white' }}
						name="user"
						size={32}
					/>
				</View>
				<View style={{
					flexDirection: 'column',
        			justifyContent: 'center',
				}}
				>
					<RkText style={username}>{this.props.name}</RkText>
					{description}
				</View>
			</View>
		);
	}
}
