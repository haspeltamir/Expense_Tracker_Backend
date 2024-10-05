/*
db.js is responsible for establishing a connection to the MongoDB database.
It uses Mongoose for object data modeling and Winston for logging.
*/

import mongoose from 'mongoose';
import config from 'config';
import winston from 'winston'; // Winston is used for logging

// Retrieve the database connection string from the configuration file
const db = config.get('db');


export default function () {
    // Connect to MongoDB using Mongoose
    mongoose.connect(db, {})
        .then(() => {
            console.log(`Connected to ${db}...`); // Log to the console
            winston.info(`Connected to ${db}...`); // Log the connection using Winston
        }); // Error handling is managed globally, so no catch block is required
};
