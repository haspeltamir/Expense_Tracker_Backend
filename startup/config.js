/*
config.js is used to check if the jwtPrivateKey is defined in the environment variable. 
If it is not defined, the application will throw an error and stop the application.
*/

import config from 'config';

module.exports = function () {
    // Check if the JWT Private Key is set in the environment variables
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
};
