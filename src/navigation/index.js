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
		Main: createStackNavigator(
			{
				Tabs: containers.Tabs,
				Detail: containers.Detail,
				Address: containers.Address,
				Photos: containers.Photos,
				Preview: containers.Preview,
				Post: containers.Post,
			},
			{
				initialRouteName: 'Tabs',
			},
		),
		ModalStack: containers.ModalStack,
	},
	{
		initialRouteName: 'Main',
	},
);
