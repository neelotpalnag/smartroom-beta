var awsIot = require('aws-iot-device-sdk');
// var SRHubLocal = require('./src/SRHubLocal')

var LocalState = require('./src/LocalState');
var OnShadowDelta = require('./src/OnShadowDelta');


var PATH_CERT = '/home/papapumpkin/Projects/certs_smartroom/';
// var sr_hub_local = new SRHubLocal();

// sr is the abbreviation for SmartRoom
// Declare the Device
var sr_hub = awsIot.device({
	keyPath: PATH_CERT + '0cb3a300de-private.pem.key',
	certPath: PATH_CERT + '0cb3a300de-certificate.pem.crt',
	caPath: PATH_CERT + 'VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem',
	clientId: 'smartroom_hub_0',
	host: 'a33bhpvmaudokh.iot.ap-southeast-1.amazonaws.com'
});

// Declare the Device Shadow
var sr_hub_shadow = awsIot.thingShadow({
	keyPath: PATH_CERT + '0cb3a300de-private.pem.key',
	certPath: PATH_CERT + '0cb3a300de-certificate.pem.crt',
	caPath: PATH_CERT + 'VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem',
	clientId: 'smartroom_hub_0',
	host: 'a33bhpvmaudokh.iot.ap-southeast-1.amazonaws.com'
});

var clientTokenUpdate;
var clientTokenGet;

// Register thingShadow's association with alias
var THING_REGISTERED = false;

sr_hub_shadow.on('connect', function(){
	sr_hub_shadow.register('smartroom_hub_0', {}, function(){
		LocalState.GetLocalState(function(savedHubState){
			clientTokenUpdate = sr_hub_shadow.update('smartroom_hub_0', savedHubState);
			// clientTokenGet = sr_hub_shadow.get('smartroom_hub_0');

			if (clientTokenUpdate === null){
				console.log('Shadow Update Failed!');
			};
		});
	});	
});

sr_hub_shadow.on('status', function(thingName, stat, clientToken, stateObject){
		console.log('1. Received ' + stat + ' on ' +
		 thingName + ': ' + stateObject + '\n');
});


var shadow_version = 0;
sr_hub_shadow.on('delta', 
    function(thingName, stateObject) {
       console.log('Received delta on '+thingName+': '+
                   JSON.stringify(stateObject) + '\n');
       shadow_version = OnShadowDelta.OnShadowDelta(shadow_version, stateObject);
       // LocalState.SetLocalState({
       // 	"state": {
       // 		"reported":	stateObject.state}
       // 	}
       // 	);
    });

//sr_hub_local.on('trigger', 
//	function(){
//		// Here: 
//	});

sr_hub_shadow.on('timeout',
    function(thingName, clientToken) {
       console.log('3. Received timeout on '+thingName+
                   ' with token: '+ clientToken + '\n');
    });