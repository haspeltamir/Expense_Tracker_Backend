# `startup` Folder

The `startup` folder contains various configuration and initialization scripts that are essential for setting up the application. Each file in this directory has a specific purpose:

- **`config.js`**: Ensures that critical configuration variables, such as `jwtPrivateKey`, are set before the application starts.
- **`db.js`**: Handles the connection to the MongoDB database using Mongoose and logs the connection status.
- **`logging.js`**: Sets up application-wide logging using Winston, handling both synchronous exceptions and unhandled promise rejections.
- **`loggingForTesting.js`**: An alternative logging setup, primarily used for testing environments.
- **`prod.js`**: Configures the application for a production environment, enabling security headers and response compression.
- **`routes.js`**: Registers all the route handlers for different endpoints and sets up the error handling middleware.
- **`validation.js`**: Initializes the Joi validation library and extends it to support MongoDB object IDs.

This folder is crucial for the initial setup and configuration of the application, ensuring that it is properly prepared to handle requests, connect to the database, and log important events.
