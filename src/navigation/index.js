
import {
	createSwitchNavigator,
	createStackNavigator,
	createAppContainer,
} from 'react-navigation';
import * as containers from '~cont/*/index.js';

const RootStack = createSwitchNavigator(
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


export const AppContainer = createAppContainer(RootStack);
