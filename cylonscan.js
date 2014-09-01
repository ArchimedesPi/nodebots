var five = require('johnny-five');
var _ = require('underscore');
board = new five.Board();

board.on("ready", function() {
    var leds = _.map([2, 3, 4, 5], function (pin) {return new five.Led(pin);});
    leds = [new five.Led(2), new five.Led(3)];
    this.repl.inject({leds: leds});

    _.each(leds, function (led) {led.off();});
    _.each(leds, function (led) {led.on();});
});