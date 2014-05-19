# Butter.js

A simple way to submit form data over AJAX with minimal changes to markup and backend code.

## Example

	$('form').butter();

That's all.

## Options

Option         | Default                            | Notes
------         | -------                            | -----
`endpoint`     | form action attribute              | Where the form data will be submitted to.
`method`       | form method attribute              | POST, GET, etc.
`params`       | `{ name: 'ajax', value: true }`    | Additional parameters added to the request, if you need to differentiate between normal and AJAX requests on the server.
`responseType` | `json`                             | The expected response format. Other options are: `xml`, `script`, or `html`.
`onDone`       | `function(data) { Butter.done() }` | Called when the $.ajax function receives a valid response.
`onFail`       | `function(data) { Butter.fail() }` | Called when the $.ajax function receives an invalid response.
`onComplete`   | `function(data) { }`               | Called when the $.ajax function has completed, regardless of the state of the response.

## Events

Events are triggered on the elements that are passed to the function.

- `butterSubmit` - When Butter has been initialised, just before the AJAX request is made.
- `butterDone` - When a valid response is received
- `butterFail` - An invalid response is received
- `butterComplete` - When the AJAX call has received a response, regardless of it's state

All events have data attached to them.

## Why Butter?

Because it makes interactions smooth and tastes delicious with [Garlic](http://garlicjs.org/) and [Parsley](http://parsleyjs.org/).

## Copyright & License

Copyright (C) 2014 HeyHuman

This program is free software: you can redistribute it and/or modify it under the terms of the [GNU General Public License](license.md) as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.