"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_graphql_1 = __importDefault(require("express-graphql"));
const GQLSchema_1 = require("./schema/GQLSchema");
const GQLResolver_1 = require("./resolver/GQLResolver");
exports.GraphQLHandler = express_graphql_1.default({
    schema: GQLSchema_1.GQLSchema,
    rootValue: GQLResolver_1.GQLResolver,
    graphiql: true
});
