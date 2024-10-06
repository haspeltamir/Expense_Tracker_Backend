# `models` Folder

The `models` folder contains all the data models used in the application. 
Each file defines the schema, model, and validation functions for different entities in the system. These models interact with the database to perform CRUD operations and enforce data integrity.

- **`user.js`**: Defines the schema and model for Customer entities. It includes fields such as `name`, `isGold`, and `phone`. A validation function is also provided to ensure that customer data conforms to the required structure.
- **`genre.js`**: Defines the schema and model for Genre entities. The schema includes a single `name` field. A validation function is provided to validate the genre data.
- **`movie.js`**: Defines the schema and model for Movie entities. It includes fields such as `title`, `genre`, `numberInStock`, and `dailyRentalRate`. The file also contains a validation function to validate movie data.
- **`rental.js`**: Defines the schema and model for Rental entities. The schema includes fields for `customer`, `movie`, `dateOut`, `dateReturned`, and `rentalFee`. A validation function is provided to validate rental data.
- **`user.js`**: Defines the schema and model for User entities. It includes fields such as `name`, `email`, `password`, and `isAdmin`. A method for generating authentication tokens is also included. A validation function is provided to validate user data.

These models are essential for defining the structure of the data in the application and ensuring that the data adheres to specific rules before being stored in the database.
