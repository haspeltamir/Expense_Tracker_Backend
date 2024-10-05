/*
What are Resolvers?
-   Resolvers are functions that determine how to fetch the data associated with each field in the "schema".
-   Resolvers are functions that run on the server when a client queries the server for some data.
-   Resolvers are functions that resolve the data for the fields in the schema.

    in our case, we need to create resolvers for :
        * the "UsersDB" Query, "authUser" Query, and "user" Query.
            type Query {
                UsersDB: [User!] # "UsersDB" Query will return an array of all of the UsersDB
                authUser: User # "authUser" Query will return the authenticated user(or null if not authenticated)
                user(id: ID!): User # "user" Query will return a single user by ID
            }

        -   "UsersDB" Query will return an array of all of the UsersDB
        -   "authUser" Query will return the authenticated user(or null if not authenticated)
        -   "user" Query will return a single user by ID

        * the "signUp" Mutation, "loginUser" Mutation, and "logoutUser" Mutation.
            type Mutation { 
                signUp(input: SignUpInput!) : User
                loginUser(input: LoginInput!): User
                logoutUser: logoutUserResponse
            }

        -   "signUp" Mutation will create a new user
        -   "loginUser" Mutation will login a user
        -   "logoutUser" Mutation will logout a user


*/
import { UsersDB } from '../dummyData/data.js';
//With Dummy Data in an local js file:
const usersResolver = {
    Query: {
        users: () => {
            return UsersDB;
        },
        // user: (_, { id }) => {
        //     return UsersDB.find(user => user._id === id);
        // }
        user: (_, args) => {
            return UsersDB.find(user => user._id === args.id);
        }
        // authUser: () => {
        //     return users[0];
        // }
    },

    Mutation: {
        //     signUp: (_, { input }) => {
        //         const { username, name
        //             , password, profile } = input;
        //         const newUser = {
        //             _id: String(UsersDB.length + 1),
        //             username,
        //             name,
        //             password,
        //             profilePicture: profile
        //         };
        //         UsersDB.push(newUser);
        //         return newUser;
        //     }
    }
};


// After i have Mongoose :
// const usersResolver = {
//     Query: {
//         UsersDB: () => {
//             return User.find({});
//         },
//         authUser: () => {
//             return User.find({});
//         }
//     },
//     Mutation: {
//         signUp: async (_, { input }) => {
//             const { username, name, password } = input;
//             const user = new User({ username, name, password });
//             await user.save();
//             return user;
//         }
//     }
// };


export default usersResolver;