/*
user.js defines the schema and model for User entities in the application.
It also provides a validation function to validate user data.
*/

import mongoose from 'mongoose';
// import Joi from 'joi';
// import jwt from 'jsonwebtoken';
// import config from 'config';

// Mongoose Schema for User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    profilePicture: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Shemale"]
    },
},
    {
        timestamps: true// Using "timestamp", I Can know how long someone been subscribed to my service (just for example) 
    }

);

// Method to generate an authentication token for the user
// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({
//         _id: this._id,
//         isAdmin: this.isAdmin
//     }, config.get('jwtPrivateKey'));
//     return token;
// };

// Mongoose Model for User
const User = mongoose.model('User', userSchema);

// Validation function for User input
// function validateUser(user) {
//     const schema = Joi.object({
//         name: Joi.string().min(5).max(50).required(),
//         password: Joi.string().min(5).max(1024).required(),

//     });
//     return schema.validate(user);
// }

//ways to export
//1 Regular way
// export { User, validateUser };
export { User };
//to import do: import { User, validateUser } from './path_to_user.js';

//2 Named Exports
/*
 export const User = mongoose.model('User', userSchema);
export function validateUser(user) {
validation logic
  }
    import { User, validateUser } from './path_to_user.js';
*/

//3 Default Export
/*
export default mongoose.model('User', userSchema);// can only have one default export
import User from './path_to_user.js';
*/

//4 combining default and named exports
/*
export default User;
export function validateUser(user) {
    validation logic
    }

    
* to import: import User, { validateUser } from './path_to_user.js';
    */