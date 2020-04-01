"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.GQLSchema = graphql_1.buildSchema(`
type USER {
    _id: ID!
    name: String!
    email: String!
    date : String!
    password: String!
    token: String!
}

input UserInput {
    name: String!
    email: String!
    date : String!
    password: String!
}

type RootQuery {
users: [USER!]!
auth: USER
}

type RootMutation {
    createUser(userInput: UserInput) : USER
    login(email: String!, password: String!): USER!
}

schema {
    query:RootQuery
    mutation:RootMutation
}
`);
