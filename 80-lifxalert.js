/**
 * Open source 2014 Tinaja Labs
 *
 **/

// Sample Node-RED node file

// Require main module
var RED = require(process.env.NODE_RED_HOME+"/red/red");
// var util = require("util");

var lifx = require('lifx');
lifx.setDebug(false);

var lx   = null;

// The main node definition - most things happen in here
function LifxAlertNode(n) {

    if (lx == null) lx = lifx.init();

    var bulb = lx.bulbs[0];

    // Create a RED node
    RED.nodes.createNode(this,n);

    // Store local copies of the node configuration (as defined in the .html)
    this.topic = n.topic;

    var msg = {};
    msg.topic = this.topic;

    // set up the lifx
    this.on('input', function(msg) {

        // do something with 'msg'

        var hue = 0xcc15;  // the default (purple)
        if (msg.payload == "1")
        {
            hue = 0x2710;  // yellow - warning
            console.log("sending warning to Lixf");
        }
        else if(msg.payload == "2")
        {
            hue = 0x0000;  // red - critical
            console.log("sending critical to Lixf");
        }
        else 
        {
            hue = 0x4E20;  // green - all good
            console.log("sending normal to Lixf");
        }

        var sat = 0xffff
        var lum = 0x8000;
        var wcolor = 0;
        var fade = 0x0513;

        lx.lightsOn(bulb);
        lx.lightsColour(hue, sat, lum, wcolor, fade);
        // lx.lightsColour(hue, sat, lum, wcolor, fade, bulb);

        // send out the message to the rest of the workspace.
        this.send(msg);
    });

    this.on("close", function() {
        // Called when the node is shutdown - eg on redeploy.
        // Allows ports to be closed, connections dropped etc.
        // eg: this.client.disconnect();
        console.log("Closing Lifx...");
        lx.close();
    });
}

// Register the node by name. This must be called before overriding any of the Node functions.
RED.nodes.registerType("lifxalert",LifxAlertNode);
