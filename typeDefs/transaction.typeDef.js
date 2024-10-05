const transactionsTypeDefs = `#graphql
    type Transaction {
        _id: ID!
        userId: ID! # reference to the User who created the transaction
        description: String!
        paymentType: String!
        category: String
        amount: Float!
        location: String
        dateOfTransaction: String!
        # createdAt: String!
    }

    # the Queries the client can make for the Transaction type
    type Query {
        getTransactions: [Transaction]
        getTransaction(id: ID!): Transaction
    }

    # the Mutations the client can make for the Transaction type
    type Mutation {
       createTransaction(input: CreateTransactionInput): Transaction
       updateTransaction(input: UpdateTransactionInput): Transaction
       deleteTransaction(id: ID!): Transaction
    }

    input CreateTransactionInput {
        description: String!
        paymentType: String!
        category: String
        amount: Float!
        dateOfTransaction: String!
        location: String
    }

    input UpdateTransactionInput {
        transactionId: ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        dateOfTransaction: String
        location: String
    }

`
export default transactionsTypeDefs