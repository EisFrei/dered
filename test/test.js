var dered = require('../dist/dered');
var chalk = require('chalk');

function testSuccess (file){
	var data = require(file);
	var encoded = dered.encode(data);
	var decoded = dered.decode(encoded);
	console.log('should succeed');
	// console.log('origina', JSON.stringify(data).length, JSON.stringify(data));
	// console.log('encoded', JSON.stringify(encoded).length, JSON.stringify(encoded));
	// console.log('decoded', JSON.stringify(decoded).length, JSON.stringify(decoded));
	if (JSON.stringify(data) === JSON.stringify(decoded)) {
		console.log(JSON.stringify(encoded).length + ' / ' + JSON.stringify(data).length);
		console.log(chalk.green('success'), file);
		return true;
	} else {
		console.log(chalk.red('fail'), file);
		return false;
	}
}

function testFail (file){
	var data = require(file);
	console.log('should fail');
	try{
	var encoded = dered.encode(data);
	var decoded = dered.decode(encoded);
	}catch(e) {
		console.log(chalk.green('successful fail'), file);
		return true;
	}
	console.log(chalk.red('did not fail'), file);
	return false;
}

var goodFiles = ['good_flat_small.json','good_nested.json','good_flat_huge.json'];
var badFiles = ['bad_mix.json'];

var goodSuccess = goodFiles.filter(function(file){
	return testSuccess('./data/'+file);
});
var badSuccess = badFiles.filter(function(file){
	return('./data/'+file);
});

console.log('shouldSucceed',chalk.green(goodSuccess.length),'/',goodFiles.length);
console.log('shouldFail',chalk.green(badSuccess.length),'/',badFiles.length);