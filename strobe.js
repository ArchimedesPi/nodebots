var five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function () {
    // Create a LED!
    var led = new five.Led(13);

    // Strobe the pin
    led.strobe();
    
    // Inject it to the repl
    this.repl.inject({led: led});
});
