/**
 * Created by jim on 7/29/16.
 */
var popMessage = require('./population');
var eoyMessage = require('./eoypop').result;

popMessage.exec();

console.log(popMessage.result);
console.log(eoyMessage);
