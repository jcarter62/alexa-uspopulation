/*
file: index.js
purpose: Provide user the population via alexa interface.
This is the main entry point for alexa app.  Contains launch & intents.

20160809: Implemented CancelIntent due to Certification failure.

Also, removed response.card() from built in intents.  After reviewing youtube instruction
on why cards exist, it appeared more appropriate for cards to be generated only when the user
obtained a population, instead of every time there was a response.
 */

var alexa = require('alexa-app');
var app = new alexa.app();
var Population = require('./population');

/**
 * LaunchRequest.
 */
app.launch(function(request,response) {
	var msg = 'Hello, I can provide you with the united states population for ' +
		'today or the end of last year. ' +
			'Ask for today, last year, or end of year ';
	var title = 'US Population';
	response.say(msg);
	response.shouldEndSession(false);
});

app.intent('AMAZON.StopIntent',
	function( request,response ) {
		var msg = 'Thank you for using U. S. Population, goodbye.';
		var title = 'US Population';
		response.say(msg);
		response.card(title, "Population Card");
		response.shouldEndSession(true);

		console.log('>>> StopIntent <<<');
		console.log(msg);
	}
);

app.intent('AMAZON.CancelIntent',
	function( request,response ) {
		var msg = 'Goodbye.';
		response.say(msg);
		response.shouldEndSession(true);

		console.log('>>> CancelIntent <<<');
		console.log(msg);
	}
);

app.intent('AMAZON.HelpIntent',
	function( request,response ) {
		var msg = 'This skill is intended to provide the U. S. Population for ' +
			'today or last year.  Please ask for today or the end of last year. ';
		var title = 'US Population';
		response.say(msg);
		response.shouldEndSession(false);

		console.log('>>> HelpIntent <<<');
		console.log(msg);
	}
);

/**
 * IntentRequest w/ asynchronous response.
 *
 checkPopulation population today
 checkPopulation today's population
 checkPopulation population
 checkPopulation today
 */
app.intent('checkPopulation',
	{
		'utterances':[
			'population today', 'today\'s population', 'population', 'today'
		]
	},

	function(request,response) {
		setTimeout(function() {		// simulate an async request
            Population.exec('today');
			var popstr = Population.result;
			var title = 'US Population';
			var msg = 'The United States population ' + popstr;

			// This is async and will run after a brief delay
			response.say(msg);
			response.card(title,msg);

			// Must call send to end the original request
			response.send();
			response.shouldEndSession(false);

			console.log('>>> today <<<');
			console.log(msg);
		}, 250);

		// Return false immediately so alexa-app doesn't send the response
		return false;
	}
);

/**
 * IntentRequest w/ asynchronous response.
 *
 *
 eoyPopulation end of year population
 eoyPopulation end of year
 eoyPopulation last year
 */
app.intent('eoyPopulation',
	{
		'utterances':[
			'end of year population', 'end of year', 'last year'
		]
	},
	function(request,response) {
		setTimeout(function() {		// simulate an async request
			Population.exec('eoy');
			var popstr = Population.result;
			var title = 'US Population';
			var msg = 'The United States population ' + popstr;

			// This is async and will run after a brief delay
			response.say(msg);
			response.card(title,msg);

			// Must call send to end the original request
			response.send();
			response.shouldEndSession(false);

			console.log('>>> eoy <<<')
			console.log(msg);
		}, 250);

		// Return false immediately so alexa-app doesn't send the response
		return false;
	}
);

/**
 * Error handler for any thrown errors.
 */
app.error = function(exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
