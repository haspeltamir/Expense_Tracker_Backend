/*
 TypeDefs:
    What are TypeDefs? (or Type Definitions)
        - Type definitions define the shape of the data available in the GraphQL API. 
        They specify the types of objects that can be queried and the relationships between them.
*/

const usersTypeDef = `#graphql
    # This is a User type that defines the shape of the User object(the data that will be returned)
    type User { # "type" is used to define the shape of the data that will be returned from the server to the client
        _id: ID!
        username: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String
        # email: String!
        # transactions: [Transaction]
    }

    # Query is a special type in GraphQL that defines the entry point for the API
    # it will tell our Schema which queries the client is allowed to make 
    type Query {
        users: [User!] # "users" Query will return an array of all of the users
        authUser: User # "authUser" Query will return the authenticated user(or null if not authenticated)
        user(id: ID!): User # "user" Query will return a single user by ID
    }

   
    # Mutation is a special type in GraphQL that defines the Actions that the client can perform
    # it will tell our Schema which mutations the client is allowed to make
    type Mutation { 
        signUp(input: SignUpInput!) : User # Like a POST request in REST API
        loginUser(input: LoginInput!): User # Like a POST request in REST API
        logoutUser: logoutUserResponse # Like a POST request in REST API
    }
    # "input"  is like "Joi" validation function in ExpressJS
    input SignUpInput { # "input" is used to define the shape of the data that will be sent from the client to the server
        username: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type logoutUserResponse {
        message: String!
    }
`
export default usersTypeDef 
