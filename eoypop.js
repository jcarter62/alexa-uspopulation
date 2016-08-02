/*  api call
 http://api.population.io:80/1.0/population/United%20States/2016-17-28/
 need to fill in the date with today's date.

 Example return:
 {
 "total_population": {
 "date": "2016-07-28",
 "population": 327874276
 }
 }
 */

var request = require('sync-request');

module.exports = {
    result: 0,
    exec: function () {
        var urlBase = "http://api.population.io:80/1.0/population/United%20States/";
        var lastDayofYear = "";
        var dateobj = new Date;
        err = false;
        data = "";

        lastDayofYear = dateobj.getFullYear() - 1 + '-12-31';

        var url = urlBase + lastDayofYear + '/';

        this.result = 'on ' + lastDayofYear + ' is ';
        // Now we need to call the api.

        var res = request('GET', url);
        var s = JSON.parse(res.getBody());
        this.result = this.result + s.total_population.population;
    }
}

module.exports.exec();
