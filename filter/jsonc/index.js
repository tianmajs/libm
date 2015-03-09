'use strict';

var util = require('util');

var TEMPLATE = 'module.exports = %s;';

/**
 * Convert JSON file to CMD module.
 * @param file {Object}
 */
module.exports = function () {
	return function (next, done) {
		var err;
		
		try {
			this.data = JSON.stringify(JSON.parse(this.data));
		} catch (e) {
			err = new Error('JSON syntax error.');
		}
		
		if (err) {
			done(err);
		} else {
			this.data = util.format(TEMPLATE, this.data);
			next(done);
		}
	};
};