import React from 'react';
import {
	createSwitchNavigator,
	createStackNavigator,
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
} from 'react-navigation';
import { View } from 'react-native';
import * as containers from '~cont/*/index.js';


export const RootStack = createSwitchNavigator(
	{
		
		Main: createStackNavigator({
			Home: containers.Home,
		}, {
			initialRouteName: 'Home',
		}),
	},
	{
		initialRouteName: 'Main',
	},
);
