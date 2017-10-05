dered
===========

Deredundantize JSON data before transmitting it.

Useful when you have a huge array containing the same datastructure over and over again.

	[
		{
			"long_key1": "value1",
			"long_key2": "value2"
		},
		{
			"long_key1": "value3",
			"long_key2": "value4"
		},
		[…]
		{
			"long_key1": "value7",
			"long_key2": "value8"
		},
		{
			"long_key1": "value9",
			"long_key2": "value10"
		}
	]

becomes

	{
		"δ": [
			["long_key1", "long_key2"],
			[
				["value1", "value2"],
				["value3", "value4"],
				["value7", "value8"],
				["value9", "value10"]
			]
		]
	}


Usage
-----

Install

	npm i dered

Require

	const dered = require('dered');

Remove redundancies

	var less_data = dered.encode(json);

Re-add redundancies

	var more_data = dered.decode(less_data);

**Do NOT use *δ* as key in the source data!**