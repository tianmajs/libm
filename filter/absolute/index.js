'use strict';

var util = require('util');
var url = require('url');
var path = require('path');

var	PATTTEN_URL = /url\s*\(\s*(['"]?)([^'"]+?)\1\s*\)/g;

module.exports = function () {
	return function (next, done) {
		var relative = '/' + this.relative;

		this.data = this.data.replace(PATTTEN_URL, function (all, quote, id) {
			id = url.resolve(relative, id);
			return 'url(' + id + ')';
		});

		next(done);
	};
};