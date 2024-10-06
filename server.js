// npm install @apollo/server express graphql cors
import "dotenv/config";

import express from 'express';
import http from 'http';
import cors from 'cors';


import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import { typeDefs, resolvers } from './schema';
import mergedTypeDefs from "./typeDefs/index.js"
import mergedResolvers from "./resolvers/index.js"




// Required logic for integrating with Express
const app = express();



// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our server to start
await server.start();

// Logging Setup
import loggingDown from './startup/logging.js'; // Sets up logging for the application using the `winston` library. This ensures that all errors and important information are logged properly.
loggingDown();
// Database Connection

import db from './startup/db.js';// Connects the application to the MongoDB database. This function is defined in a separate module (`db.js`) and handles the connection process.
db();


// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/',
    cors(),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);




const PORT = process.env.PORT;
// Modified server startup
await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
);

console.log(`🚀 Server ready at http://localhost:${PORT}/`);



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