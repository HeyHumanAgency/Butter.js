module.exports = function(grunt) {

	var testMiddleware = require('./test/server.js');

	grunt.initConfig({

		uglify: {
			main: {
				options: {
					mangle: false,
					preserveComments: 'some'
				},
				files: {
					'butter.min.js': 'butter.js'
				}
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'butter.js', 'test/*.js']
		},

		connect: {
			testServer: {
				options: {
					port: 9001,
					middleware: testMiddleware
				}
			}
		},

		qunit: {
			all: {
				options: {
					urls: [
						'http://localhost:9001/test/',
						'http://localhost:9001/test/?jquery=1.9.0',
						'http://localhost:9001/test/?jquery=1.10.0',
						'http://localhost:9001/test/?jquery=2.0.0',
						'http://localhost:9001/test/?min',
					]
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('default', ['test', 'uglify']);
	grunt.registerTask('test', ['jshint', 'connect', 'qunit']);

};