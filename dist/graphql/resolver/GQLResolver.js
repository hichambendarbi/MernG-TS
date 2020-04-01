"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../../features/user/UserController");
exports.GQLResolver = {
    users: UserController_1.userController.getUsers,
    createUser: UserController_1.userController.createUser,
    login: UserController_1.userController.login,
};
