"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./features/user/UserController");
const GraphQlHandler_1 = require("./graphql/GraphQlHandler");
const routes = ($) => {
    $.all('/gql', GraphQlHandler_1.GraphQLHandler);
    // Verify Token
    // $.get('/token-verify', userController.isAuth);
    $.get('/GetUserBy-ID', UserController_1.userController.isAuth, UserController_1.userController.getUserByID);
    return $;
};
exports.default = routes;
