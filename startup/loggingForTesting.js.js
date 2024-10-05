/*
loggingForTesting.js is an alternative logging configuration, tailored for testing environments.
It also uses Winston for logging, with potential support for logging to MongoDB.
*/

const winston = require('winston'); // Winston logging library

module.exports = function () {
    // Add a transport to Winston for logging to a file
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));

    // Uncomment the lines below to enable logging to MongoDB
    // winston.add(new winston.transports.MongoDB({ db: process.env.MONGO_URL }));
    // winston.add(new winston.transports.MongoDB({ db: process.env.MONGO_URL, level: 'info' }));
};
