/*
prod.js is used to configure the application for a production environment.
It sets up security features and compresses responses using middleware.
*/

const helmet = require('helmet'); // Helmet helps secure the app by setting various HTTP headers
const compression = require('compression'); // Compression middleware to reduce response size

module.exports = function (app) {
    console.log('Production Environment');
    app.use(helmet()); // Enable security headers
    app.use(compression()); // Enable response compression
};
