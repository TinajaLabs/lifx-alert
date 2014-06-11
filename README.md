# lifx-alert

lifx node-red module to show system status using the wifi based lifx led light bulb - http://lifx.co/ 

Read about node-red here: https://github.com/node-red


My first attempt at writing a node-red node.  This one is meant to talk to the wifi based Lifx LED light bulb and turn it green, yellow, or red based on an alert condition.  I plan to use it for my home automation system as an indicator of overall system status.  The code was derived originally from the sample demo template node.

## Prerequisites

    npm install lifx

a module from magicmonkey - https://www.npmjs.org/package/lifx - this does the real work of connecting to the lifx wifi light bulbs.

The initial setup of the lifx wifi was done with the android app.

## Configuration 
I added these files (80-lifxalert.html, 80-lifxalert.js) into:
	
	nodes/core/io/

Maybe they could go into:
	
	nodes/core/hardware/

I'm also not sure about what the numbering scheme refers to.  Perhaps you will need to rename the .html and the .js files.


## Restart Node-Red
Once the lifx package is installed and the lifxalert files are in place, you should restart the node-red application.  I'm running it on a beaglebone black and I start it from the root of the node-red directory like this:

	node --max-old-space-size=256 red.js -v

When you reload the web page you should see a new purple module in the outputs section called lifxalert.


## Sample Flow 
To set up a flow and test this out, I created 3 inject nodes to send a string when clicked:

	Payload: string=0, Name: status normal - 0 
	Payload: string=1, Name: status warning - 1 
	Payload: string=2, Name: status critical - 2 

Drag the lifxalert module onto the workspace. It has 2 fields, topic and name.  Give the node a unique name like "Lifx Alerts".

Finally I added a debug node to confirm that the output is generated.  You should see a 0, 1, 2 in the debug window when you click on the Inject node.

Here's the flow:

	[{"id":"1596ae04.ea6952","type":"lifxalert","name":"Lifx Alert","topic":"lifx","x":316,"y":568,"z":"cb5fa895.34a058","wires":[["ccf84f8e.3307b"]]},{"id":"cf74d59d.308b28","type":"inject","name":"status normal: 0","topic":"","payload":"0","payloadType":"string","repeat":"","crontab":"","once":true,"x":117,"y":527,"z":"cb5fa895.34a058","wires":[["1596ae04.ea6952"]]},{"id":"ccf84f8e.3307b","type":"debug","name":"lifx output","active":true,"console":"false","complete":"false","x":492,"y":601,"z":"cb5fa895.34a058","wires":[]},{"id":"abcff9be.543008","type":"inject","name":"status warning: 1","topic":"","payload":"1","payloadType":"string","repeat":"","crontab":"","once":false,"x":120,"y":566,"z":"cb5fa895.34a058","wires":[["1596ae04.ea6952"]]},{"id":"bb957bce.446a88","type":"inject","name":"status critical: 2","topic":"","payload":"2","payloadType":"string","repeat":"","crontab":"","once":false,"x":114,"y":605,"z":"cb5fa895.34a058","wires":[["1596ae04.ea6952"]]}]

## Issues

1. Sometimes after a few minutes of inactivity, I see an error "[Error: This socket is closed.]"  I'm not sure why this is.  But then after some more time, it seems to resolve.  I suspect it has something to do with how one is to set up the initialization of access to the wifi gateway within the function.  I'd like to either:
	a. reopen the lifx gateway for each hit and subsequently close the connection, or
	b. open the lifx wifi connection and leave it open, closing only when I shut down Node-red.


I'm new to this, so any tips and tricks would be appreciated.  Thanks.