module.exports = {
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false, // <== ADD THIS
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module' // Allows for the use of imports
	},
	extends: ["airbnb-base", "prettier"],
	env: {
			browser: true,
			es6: true,
			jest: true,
	},
	rules: {
			"no-console": 0,
			"import/prefer-default-export": 0,
			"prefer-template": 0,
	},
};