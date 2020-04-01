import express from "express";
import {userController} from './features/user/UserController'
import { GraphQLHandler } from './graphql/GraphQlHandler';

const routes = ($: express.Router) => {

    $.all('/gql', GraphQLHandler);

    $.get('/GetUserBy-ID', userController.isAuth , userController.getUserByID)

return $};

export default routes;