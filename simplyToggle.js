simply.title("Toggle the light");

simply.on('accelTap', function(e) {
	ajax({ url: 'http://nplusllamp.ngrok.com/lampToggle' }, function(data) {
		simply.vibe();
	});
});