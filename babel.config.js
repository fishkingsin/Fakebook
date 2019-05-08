module.exports = {
	"presets": [
		"module:metro-react-native-babel-preset"
	],
	"plugins": [
		[
			"module-resolver",
			{
				"cwd": "babelrc",
				"extensions": [
					".js",
					".ios.js",
					".android.js"
				],
				"alias": {
					"~": "./src",
					"~comp": "./src/components",
					"~cont": "./src/containers",
					"helper": "./__tests__/testHelpers"
				}
			}
		],
		[
			"@babel/plugin-transform-spread",
			{
				"loose": true
			}
		],
		"@babel/plugin-proposal-export-namespace-from",
		"relay",
    	"jest-hoist",
		"import-glob"
	]
}
