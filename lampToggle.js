var Hapi = require ('hapi');
var five = require("johnny-five"),
	board = new five.Board(),
	lamp;
var server = new Hapi.Server(3030);

board.on("ready", function () {
	// Create the lamp as an LED
	lamp = new five.Led(13);

	// Expose the lamp to the REPL
	this.repl.inject({lamp: lamp});

});

server.route({
	method: 'GET',
	path: '/lampToggle',
	handler: function (request, reply) {
		if (board.isReady) {lamp.toggle();}
		reply('{"this": "ok"}').code(200);
	}
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});