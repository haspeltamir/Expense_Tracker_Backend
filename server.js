// npm install @apollo/server express graphql cors
// Import necessary modules for the server and configuration
import "dotenv/config"; // Automatically loads environment variables from the .env file into process.env (such as database connection strings).

import express from 'express'; // Express is a web framework for building web applications and APIs with Node.js.
import http from 'http'; // Node.js' built-in module to create an HTTP server.
import cors from 'cors'; // CORS (Cross-Origin Resource Sharing) middleware allows the server to handle requests from other domains.

// Import Apollo Server-related modules for building GraphQL APIs
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; // Middleware to integrate Apollo Server with Express.
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'; // Plugin to gracefully stop the server when needed.

// Import merged schemas and resolvers for GraphQL
import mergedTypeDefs from "./Schemas/typeDefs/index.js"; // Type definitions for the GraphQL API.
import mergedResolvers from "./Schemas/resolvers/index.js"; // Resolvers define how GraphQL queries and mutations are executed.


/* --- Authentication Setup --- */

// Import Passport, a popular authentication middleware for Node.js.
// It allows us to handle user authentication using different strategies (e.g., local login, OAuth).
import passport from 'passport';

// Import the local strategy for Passport, which allows us to authenticate users using a username and password.
// We also import a function to build the context for our GraphQL resolvers.
import { buildContext } from 'graphql-passport';

// Session management middleware for Express. It allows us to store user data between HTTP requests, like when a user logs in.
import session from 'express-session';

// A MongoDB session store, used to save session data in a MongoDB database.
// Instead of saving session data on the server (which could be lost), we store it in the database for persistence.
import connectMongo from 'connect-mongodb-session';

import { configurePassport } from "./passport/passport.config.js";
configurePassport(); // Configure Passport for user authentication.

//constants for the server
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT; // Use the port from the environment file or default to 4000.


/* --- Application Setup --- */

// Initialize the Express app, which will handle HTTP requests and responses.
const app = express();


// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);



/* --- Apollo Server Setup --- */
/* 
We initialize ApolloServer to manage our GraphQL API.
Apollo Server handles incoming GraphQL requests (queries, mutations) and uses resolvers to provide responses.
We also use a plugin to handle graceful shutdown of the HTTP server.
*/
const server = new ApolloServer({
    typeDefs: mergedTypeDefs, // GraphQL schema definitions.
    resolvers: mergedResolvers, // Functions to resolve GraphQL requests (queries and mutations).
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // Ensure server shutdown happens gracefully.
});

/* --- Start Apollo Server --- */
await server.start(); // Ensure the Apollo Server is ready to accept requests.



/* --- Logging Setup --- */
/* 
This imports and runs a logging module that helps log important events and errors in the application.
We use the 'winston' library (inside logging.js) to log data to both the console and files.
*/
import loggingDown from './startup/logging.js';
loggingDown(); // Set up logging for the application.


/* --- Database Connection --- */
/* 
We establish a connection to MongoDB using a separate database configuration file (db.js).
This ensures our application can read/write data to the database.
*/
import db from './startup/db.js';
db(); // Connect to MongoDB.



/* --- MongoDB Session Store --- */
/* 
This block sets up a connection to MongoDB where we will store user session data.

1. connectMongo(session): We pass the session object to connectMongo, 
   which allows MongoDB to store session data instead of using server memory.

2. store: This is a new instance of MongoDBStore where we provide:
   - uri: The MongoDB connection string (e.g., MONGO_URL from our .env file).
   - collection: The name of the collection in MongoDB that will store session data.
*/

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
    uri: process.env.MONGO_URL, // MongoDB connection string from our environment variables.
    collection: 'sessions', // The MongoDB collection where session data will be stored.
});

//add event listeners to the store to handle errors
store.on('error', function (error) {
    console.error(error);
});


/* --- Sessions Middleware Setup--- */
/*
This block sets up session management for our Express app.

1. app.use(session): We use the session middleware to manage user sessions.
    We provide options like secret, resave, saveUninitialized, and store.
    - secret: A secret key used to sign the session ID cookie.
    - resave: Forces the session to be saved back to the session store.
        this option specifies whether to save the session to the store on each request.
        if we set it to "True", we will have multiple session for the same user.
    - saveUninitialized: Forces a session that is "uninitialized" to be saved to the store.
    - cookie: The session cookie settings (e.g., maxAge(Shelf's Live), secure, httpOnly).
    - store: The MongoDBStore instance where session data will be stored.

2. app.use(passport.initialize()): Initializes Passport for authentication.

3. app.use(passport.session()): Allows Passport to maintain persistent login sessions.
    If a user logs in, Passport saves the user object in the session.

4. app.use(cors()): Enables CORS (Cross-Origin Resource Sharing) for our Express app.
    This allows the server to handle requests from different domains.
*/

app.use(
    session({
        secret: process.env.SESSION_SECRET, // Secret key used to sign the session ID cookie.
        resave: false, // Forces the session to be saved back to the session store.
        saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store.
        cookie: {
            // maxAge: 1000 * 60 * 60 * 24, // Session cookie will live for 24 hours.
            maxAge: 1000 * 60 * 60 * 24 * 7, // Session cookie will live for 7 days.
            // secure: false, // Ensures the browser only sends the cookie over HTTPS.
            httpOnly: true, // Ensures the cookie is not accessible via client-side JavaScript.
        },
        store: store, // The MongoDBStore instance where session data will be stored.
    }),
);

app.use(passport.initialize()); // Initialize Passport for authentication.

app.use(passport.session()); // Allow Passport to maintain persistent login sessions.





/* --- HTTP Middleware Setup --- */
/* 
We set up middleware to handle HTTP requests before they reach the main application.
1. cors(): Handles cross-origin requests, allowing requests from different domains.
2. express.json(): Parses incoming requests with JSON payloads so we can work with the data.
3. expressMiddleware(): Adds Apollo's GraphQL middleware to our Express app, handling incoming GraphQL requests.
*/

// console.log("process.env.FRONTEND_URL + ':' + process.env.PORT", process.env.FRONTEND_URL + ':' + process.env.PORT);
app.use(
    '/', // Base URL for our API.
    cors(
        {
            origin: FRONTEND_URL + ':/3000'
            , // Allow requests from the frontend URL (CORS).
            credentials: true, // Enable credentials (cookies, authorization headers).
        }
    ), // Handle requests from different domains.
    express.json(), // Parse JSON payloads in requests.
    expressMiddleware(server, {
        //"context" is a function that returns an object containing data that is passed to all resolvers.
        // context: async ({ req, res }) => ({ token: req.headers.token, res }), // Attach token (from headers) to the request context.
        context: async ({ req, res }) => buildContext({ req, res }), // Attach token (from headers) to the request context.
    }),
);

/* --- Start the Server --- */
/* 
We use Node.js' built-in http module to create a server that listens for requests.
The port is read from the .env file, so the server knows where to listen for incoming requests.
*/


await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
);

console.log(`🚀 Server ready at ${FRONTEND_URL}:${PORT}`); // Log when the server is ready to accept requests.

// old standalone server

// import { ApolloServer } from "@apollo/server"
// import { startStandaloneServer } from "@apollo/server/standalone"
// import mergedTypeDefs from "./typeDefs/index.js"
// import mergedResolvers from "./resolvers/index.js"

// const server = new ApolloServer({
//     typeDefs: mergedTypeDefs,
//     resolvers: mergedResolvers
// })

// const { url } = await startStandaloneServer(server, {
//     listen: {
//         port: 4000,
//     },
// })

// console.log(`🚀 Server ready at ${url}`)


