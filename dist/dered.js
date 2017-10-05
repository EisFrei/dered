var dered = {
	encode: function encode(data) {
		var keys = [];
		var values = [];
		var entry = [];
		var tData;
		var tValues;
		var i, h, idx;
		var mode, lastMode;
		if (data === null) {
			return null;
		} else if (data instanceof Array) {
			for (i = 0; i < data.length; i++) {
				entry = data[i];
				if (entry instanceof Array) {
					tValues = encode(entry);
					mode = 'array';
				} else if (entry instanceof Object) {
					tValues = [];
					for (h in entry) {
						idx = keys.indexOf(h);
						if (idx === -1) {
							while (tValues.length < keys.length) {
								tValues.push(undefined);
							}
							keys.push(h);
							tValues.push(encode(entry[h]));

						} else {
							while (tValues.length < idx) {
								tValues.push(undefined);
							}
							tValues[idx] = encode(entry[h]);
						}
					}
					mode = 'object';
				} else {
					if (values.length > 0) {
						throw new Error('Do not mix types inside an array');
					}
					// if a primitive type is detected, return array as is.
					mode = 'primitive';
					return data;
				}
				if (!lastMode) {
					lastMode = mode;
				}
				if (lastMode !== mode) {
					throw new Error('Do not mix types inside an array');
				}
				values.push(tValues);
			}
			return {
				δ: [keys, values]
			};
		} else if (data instanceof Object) {
			tData = {};
			for (i in data) {
				tData[i] = encode(data[i]);
			}
			return tData;
		} else {
			return data;
		}
	},
	decode: function decode(data) {
		var decoded = {};
		if (data instanceof Array) {
			return data.map(decode);
		} else if (data instanceof Object) {
			for (var i in data) {
				if (i === 'δ') {
					var keys = data[i][0];
					var values = data[i][1];
					return values.map(function (tValues) {
						var obj = {};
						tValues.forEach(function (v, idx) {
							if (typeof v !== 'undefined') {
								obj[keys[idx]] = decode(v);
							}
						});
						return obj;
					});
				} else {
					decoded[i] = decode(data[i]);
				}
			}
			return decoded;
		} else {
			return data;
		}
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = dered;
}
if (typeof window !== 'undefined') {
	window.dered = dered;
}