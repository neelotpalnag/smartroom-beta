// param (state) is a JSON Object

var fs = require('fs');

const STATE_FILE = "current_state.json";

exports.SetLocalState = function(state){
	// write the state locally to file
	fs.writeFile(STATE_FILE, JSON.stringify(state), (err) =>{
		if (err){
			console.error(err);
			return;
		}
	console.log("Current Status updated in file.");
	});
}


exports.GetLocalState = function(callback){
	//read JSON from file
	fs.readFile(STATE_FILE,'utf8', function(err, data){
		if (err){
			console.error(err);
			return;
		}
		state = JSON.parse(data);
		// return state;
		callback(state);
	});
}