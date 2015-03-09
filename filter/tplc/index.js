'use strict';

var util = require('util');

var TEMPLATE = 'module.exports = "%s";';
var	PATTERN_SPECIAL_CHAR = /["\\\r\n\t\f]/g;
var ESCAPE = {
	'"': '\\"',
	'\r': '\\r',
	'\n': '\\n',
	'\t': '\\t',
	'\f': '\\f'
};

/**
 * Convert tpl file to CMD module.
 * @param file {Object}
 */
module.exports = function () {
	return function (next, done) {
		var data = this.data.replace(PATTERN_SPECIAL_CHAR, function (c) {
			return ESCAPE[c];
		});
		
		this.data = util.format(TEMPLATE, data);
		
		next(done);
	};
};