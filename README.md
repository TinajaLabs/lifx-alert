lifx-alert
==========

lifx node-red module to show system status using the lifx led light bulb


My first attempt at writing a node-red node.  This one is meant to talk to the wifi based Lifx LED light bulb and turn it green, yellow, or red based on an alert condition.  I plan to use it for my home automation system as an indicator of overall system status.  The code was derived originally from the sample demo template node.

Prerequisites:

    npm install lifx - a module from magicmonkey - https://www.npmjs.org/package/lifx - this does the real work of connecting to the lifx wifi light bulbs.

The initial setup of the lifx wifi was done with the android app.

I added these files (80-lifxalert.html, 80-lifxalert.js) into:
	
	nodes/core/io/

Maybe they could go into:
	
	nodes/core/hardware/

I'm also not sure about what the numbering scheme refers to.  Perhaps you will need to rename the .html and the .js files.


Once the lifx package is installed and the lifxalert files are in place, you should restart the node-red application.  I'm running it on a beaglebone black and I start it from the root of the node-red directory like this:

	node --max-old-space-size=256 red.js -v

When you reload the web page you should see a new purple module in the outputs section called lifxalert.


To set up a flow and test this out, I created 3 inject nodes to send a string when clicked:

	Payload: string=0, Name: status normal - 0 
	Payload: string=1, Name: status warning - 1 
	Payload: string=2, Name: status critical - 2 

Drag the lifxalert module onto the workspace. It has 2 fields, topic and name.  Give the node a unique name like "Lifx Alerts".

Finally I added a debug node to confirm that the output is generated.  You should see a 0, 1, 2 in the debug window when you click on the Inject node.

I'm new to this, so any tips and tricks would be appreciated.  Thanks.