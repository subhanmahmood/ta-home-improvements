var Customers = require('./customers');
var Parts = require('./parts');
var Jobs = require('./jobs');
var JobParts = require('./jobparts');

module.exports = {
    customer: Customers,
    part: Parts,
    job: Jobs,
    jobitem: JobParts
}