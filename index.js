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
	response.card(title,"Population Card");
	response.shouldEndSession(false);
});

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
			response.card(title,"Population Card");

			// Must call send to end the original request
			response.send();
			response.shouldEndSession(false);

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
			response.card(title,"Population Card");

			// Must call send to end the original request
			response.send();
			response.shouldEndSession(false);

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
