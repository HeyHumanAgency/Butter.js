var server = function server(connect, options) {

	var middlewares = [];

	if (!Array.isArray(options.base)) {
		options.base = [options.base];
	}

	var directory = options.directory || options.base[options.base.length - 1];

	options.base.forEach(function(base) {
		// Serve static files.
		middlewares.push(connect.static(base));
	});

	// Make directory browse-able.
	middlewares.push(connect.directory(directory));

	var routes = [
		connect().use('/test/success', function(req, res) {
			res.end('{"success": true}');
		}),
		connect().use('/test/fail', function(req, res) {
			res.statusCode = 500;
			res.end('{"success": false}');
		})
	];

	return middlewares.concat(routes);
};

module.exports = server;