var SHL = require('./SRHubLocal');

exports.OnShadowDelta = function(prevVersion, stateDelta, callback){
	deltaVersion = stateDelta.version;
	if (prevVersion >= deltaVersion){
		// NEEDN'T APPLY THE DELTA FROM OLDER VERSION 
		return
	}

	for (var i in stateDelta.state){
		if(i === 'power'){
			if(stateDelta.state[i] === 'ON'){
				// insert power on here
				console.log(" Delta: Hub status set to ON");
			}
			else{
				// insert power off here
				console.log(" Delta: Hub status set to OFF");
			}
		}

		if(i === 'light_1'){
			if(stateDelta.state[i] === 'ON'){
				// insert logic here
				console.log("-Delta: Light 1 set to ON");
			}
			else{
				// insert logic here
				console.log("-Delta: Light 1 set to OFF");
			}
		}

		if(i === 'light_2'){
			if(stateDelta.state[i] === 'ON'){
				// insert logic here
				console.log("-Delta: Light 2 set to ON");
			}
			else{
				// insert logic here
				console.log("-Delta: Light 2 set to OFF");
			}
		}
		if(i === 'fan_1'){
			if(stateDelta.state[i] === 'ON'){
				// insert logic here
				console.log("-Delta: Fan 1 set to ON");
			}
			else{
				// insert logic here
				console.log("-Delta: Fan 1 set to OFF");
			}
		}
	}
	return deltaVersion;

};