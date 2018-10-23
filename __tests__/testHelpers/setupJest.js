import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


global.fetch = require('jest-fetch-mock');

// https://github.com/oblador/react-native-vector-icons/issues/433#issuecomment-354663885
const { NativeModules } = require('react-native');
const mockIcon = require('~/images/general/logo-color.png');

NativeModules.RNVectorIconsManager = {
	getImageForFont: function getImageForFont(fontFamily, glyph, fontSize, color, callback) {
		return callback(null, mockIcon);
	},
};
