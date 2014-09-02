var Hapi = require('hapi');
var five = require("johnny-five"),
    board = new five.Board(),
    lamp;
var server = new Hapi.Server(3030);

board.on("ready", function () {
    // Create the lamp as an LED
    lamp = new five.Led(13);

    // Shut it off (if it's already on)
    lamp.off();

    // Expose the lamp to the REPL
    this.repl.inject({lamp: lamp});

});

server.route({
    method: 'POST',
    path: '/lamp/toggle',
    handler: function (request, reply) {
        if (board.isReady) {
            lamp.toggle();
            reply('{"this": "ok"}').code(200);
        }
    }
});

server.route({
    method: 'POST',
    path: '/lamp/off',
    handler: function (request, reply) {
        if (board.isReady) {
            lamp.off();
            reply('{"this": "ok"}').code(200);
        }
    }
});

server.route({
    method: 'POST',
    path: '/lamp/on',
    handler: function (request, reply) {
        if (board.isReady) {
            lamp.on();
            reply('{"this": "ok"}').code(200);
        }
    }
});

server.route({
    method: 'POST',
    route: '/lamp/strobe',
    handler: function (request, reply) {
        if (board.isReady) {
            if (request.payload.interval) {
                lamp.strobe(request.payload.interval);
            } else {
                lamp.strobe();
            }
        }
    }
});

server.route({
    method: 'GET',
    path: '/lamp/status',
    handler: function (request, reply) {
        if (board.isReady) {
            //lamp.
            reply('{"this": "ok"}').code(200);
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});