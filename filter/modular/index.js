'use strict';

var path = require('path');
var	util = require('util');

var PATTERN_REQUIRE = /(?:^|[^\.])\brequire\s*\(\s*(['"])([^'"]+?)\1\s*\)/g;
var TEMPLATE = [
	'define("%s", [%s], function(require, exports, module) {',
	'%s',
	'});'
].join('\n');

/**
 * Transport JS into a CMD module.
 * This plugin assumes all IDs in source code have been normalized.
 * @param file {Object}
 */
module.exports = function () {
	return function (next, done) {
		var requires = [];
		var	re;
			
		PATTERN_REQUIRE.lastIndex = 0;
		
		while (re = PATTERN_REQUIRE.exec(this.data)) {
			requires.push(re[2]);
		}
		
		// Dedupe dependencies
		var cache = {};
		requires = requires.filter(function (req) {
			if (!cache[req]) {
				return cache[req] = true;
			}
			
			return false;
		});
		
		// Generate dependencies code fragment.
		requires = requires.map(function (id) {
			return '"' + id + '"';
		}).join(',');

		this.data = util.format(TEMPLATE, this.relative, requires, this.data);
		
		next(done);
	};
};
