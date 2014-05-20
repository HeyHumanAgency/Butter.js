/* global QUnit, asyncTest, test, start, stop, ok, expect */

jQuery(document).ready(function($){

	if ( location.search.indexOf('min') === -1 )
		$.getScript('../butter.js');
	else
		$.getScript('../butter.min.js');

	module('Bound events');

	asyncTest('Submit, success and complete', function(){

		expect(3);

		var submit, success, complete,
			$form = $('#success');

		$form.butter();

		submit = $.Deferred();
		success = $.Deferred();
		complete = $.Deferred();

		$form.on('butterSubmit', function() {
			ok(true, 'Submit event fired');
			submit.resolve();
		});

		$form.on('butterDone', function() {
			ok(true, 'Success event fired');
			success.resolve();
		});

		$form.on('butterComplete', function() {
			ok(true, 'Complete event fired');
			complete.resolve();
		});

		$.when(submit, success, complete).then(start);

		$form.trigger('submit');

	});

	asyncTest('Fail', function(){

		var $form = $('#fail');

		$form.butter();

		$form.on('butterFail', function(){
			ok(true, 'Fail event fired');
			start();
		});

		$form.trigger('submit');

	});

	module('Callbacks');

	asyncTest('Complete and Done', function(){

		expect(2);

		var $form = $('#success'),
			complete = $.Deferred(),
			done = $.Deferred();

		$form.butter({
			onComplete: function() {
				ok(true, 'Complete callback fired');
				complete.resolve();
			},
			onDone: function() {
				ok(true, 'Done callback fired');
				done.resolve();
			}
		});

		$.when(complete, done).then(start);

		$form.trigger('submit');

	});

	asyncTest('Fail', function(){

		var $form = $('#fail');

		$form.butter({
			onFail: function() {
				ok(true, 'Fail callback fired');
				start();
			}
		});

		$form.trigger('submit');

	});

	module('Status class');

	asyncTest('Success', function(){

		var $form = $('#success');

		$form.butter();

		$form.on('butterComplete', function(){
			ok( $form.hasClass('butter-done'), 'Success class added' );
			start();
		});

		$form.trigger('submit');

	});

	asyncTest('Fail', function(){

		var $form = $('#fail');

		$form.butter();

		$form.on('butterComplete', function(){
			ok( $form.hasClass('butter-fail'), 'Fail class added' );
			start();
		});

		$form.trigger('submit');

	});

});