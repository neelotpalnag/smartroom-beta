var events = require('events');
var util = require('util');
var gpio = require('onoff').Gpio;

// This class starts detecting manual changes in the switch status of the lights

class SRHubLocal extends EventEmitter{
	constructor(){
		this.GND = -1;
		this.POWER = new gpio(4, 'out');
		this.LIGHT1 = new gpio(17, 'out');
		this.LIGHT2 = new gpio(27, 'out');
		this.FAN1 = new gpio(22, 'out');

		//////////////

		this.LIGHT1_SWITCH = new gpio(18, 'in', 'both');
		this.LIGHT2_SWITCH = new gpio(23, 'in', 'both');
		this.FAN1_SWITCH = new gpio(24, 'in', 'both');
	};

	onSwitchPress(switch){
		// Take relevant action
		// Update the "Reported" part of shadow
		//  
	};

	onClientButtonPressed(switch, mode){
		// Take action specified by the command
		// Update the reported Part pf the Shadow
	}

};




// util.inherits(SRHubLocal, events.EventEmitter);