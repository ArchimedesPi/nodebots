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

/* =====< REST APIs >===== */

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
    path: '/lamp/strobe',
    handler: function (request, reply) {
        if (board.isReady) {
            lamp.strobe(request.payload.interval);
            reply('{"this": "ok"}').code(200);
        }
    }
});

server.route({
    method: 'POST',
    path: '/lamp/stop',
    handler: function (request, reply) {
        if (board.isReady) {
            lamp.stop();
            reply('{"this": "ok"}').code(200);
        }
    }
});

server.route({
    method: 'GET',
    path: '/lamp/status',
    handler: function (request, reply) {
        if (board.isReady) {
            reply('{"this": "ok", "on": ' + lamp.isOn + '}').code(200);
        }
    }
});

/* =====< Legacy APIs >===== */

server.route({
    method: 'GET',
    path: '/lampToggle',
    handler: function (request, reply) {
        if (board.isReady) {
            lamp.toggle();
            reply('{"this": "ok"}').code(200);
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
