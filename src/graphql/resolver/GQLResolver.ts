// should cater for `RootMutation` and `RootSchema` in file `/schema/GQLSchema`
import {IGQLAPIs} from "../schema/GQLSchema";
import {userController} from "../../features/user/UserController";

export const GQLResolver: IGQLAPIs = {
    users: userController.getUsers,
    createUser: userController.createUser,
    login: userController.login,
};