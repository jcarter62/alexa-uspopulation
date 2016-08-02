var alexa = require('alexa-app');
var app = new alexa.app();
var Population = require('./population');

/**
 * LaunchRequest.
 */
app.launch(function(request,response) {
	var msg = 'Hello, I can provide you with the united states population for ' +
		'today or the end of last year. ' +
			'Ask for today or last month';
	var title = 'US Population';
	response.say(msg);
	response.card(title,"Population Card");
});

/**
 * IntentRequest.
 */
/*
app.intent('number',
  {
    'slots':{'number':'NUMBER'},
    'utterances':[ 'say the number {1-100|number}' ]
  },
  function(request,response) {
    var number = request.slot('number');
    response.say('You asked for the number '+number);
    response.shouldEndSession(true);
    response.send();
  }
);
*/


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

			// This is async and will run after a brief delay
			response.say('The United States population ' + popstr );

			// Must call send to end the original request
			response.send();

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

			// This is async and will run after a brief delay
			response.say('The United States population ' + popstr );

			// Must call send to end the original request
			response.send();

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
