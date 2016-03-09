/*!
 * Butter.js - A simple way to submit form data over AJAX with minimal changes to markup and backend code.
 * Copyright (c) 2014 HeyHuman; GPLv3 Licensed.
 */
jQuery.fn.butter = function(settings) {

	var _form = this;

	var support = function (  ) {
		return typeof window.FormData === 'function';
	};

	this.on('submit', function(e) {
		if ( !support() ) { return; }

		e.preventDefault();

		if ( typeof jQuery.fn.parsley === 'function' ) {
			if ( _form.parsley('isValid') )
				Butter.submit();
		} else {
			Butter.submit();
		}
	});

	var module = {};

	var Butter = (function() {

		var _this = this,
			defaults = {
				endpoint: _form.attr('action'),
				method: ( _form.attr('method') ) ? _form.attr('method') : 'POST',
				params: { name: 'ajax', value: true },
				responseType: 'json',
				onDone: function(data) {
					Butter.done();
				},
				onFail: function(data) {
					Butter.fail();
				},
				onComplete: function(data) {
					return null;
				}
			},
			options = jQuery.extend({}, defaults, settings);

		module.submit = function() {

			var data = new FormData( _form.get( 0 ) );

			data.append(options.params.name, options.params.value);

			_form.trigger('butterSubmit', data);

			jQuery.ajax({
				url         : options.endpoint,
				type        : options.method,
				data        : data,
				dataType    : options.responseType,
				contentType : false,
				processData : false

			}).done(function(data) {

				_form.trigger('butterDone', data);
				options.onDone(data);

			}).fail(function(data) {

				_form.trigger('butterFail', data);
				options.onFail(data);


			}).always(function(data) {

				_form.trigger('butterComplete', data);
				options.onComplete(data);

			});

		};

		module.done = function() {
			_form.toggleClass('butter-done', true);
			_form.toggleClass('butter-fail', false);
		};

		module.fail = function() {
			_form.toggleClass('butter-fail', true);
			_form.toggleClass('butter-done', false);
		};

		return module;

	})();

	return this;

};
