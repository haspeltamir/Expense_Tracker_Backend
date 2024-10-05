/*
logging.js is a module responsible for handling logging in the application using Winston.
It can log to both the console and a file, and even store logs in MongoDB.
*/

import winston from 'winston';
// import 'winston-mongodb'; // הייבוא הנכון עבור MongoDB

export default function () {
    // Handle uncaught exceptions in synchronous code
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (ex) => {
        throw ex; // Convert unhandled rejections to uncaught exceptions
    });

    // Add transports to Winston for storing logs
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));

    // הוסף תמיכה ב-MongoDB ללוגים
    // winston.add(new winston.transports.MongoDB({
    //     db: process.env.MONGO_URL,
    //     level: 'info',
    //     options: { useUnifiedTopology: true }
    // }));
}
