"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_model_1 = require("../../models/User.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import {ITokenPayload} from "../../types/token";
const validators_1 = require("../../utils/validators");
class UserController {
    constructor() {
        // Register User
        this.createUser = ({ userInput }) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, date, password } = userInput;
            const { valid, errors } = validators_1.ValidatorRegisterInput(name, email, password);
            if (!valid)
                return errors;
            const Suser = yield User_model_1.USER.findOne({ email });
            if (Suser) {
                throw new Error("User already exists");
            }
            const userPassword = yield bcryptjs_1.default.hash(password, 15);
            const newUser = new User_model_1.USER({
                name,
                email,
                date,
                password: userPassword
            });
            const User = yield newUser.save();
            const token = jsonwebtoken_1.default.sign({
                id: User.id
            }, "hicham", { expiresIn: "24h" });
            return Object.assign(Object.assign({}, User._doc), { id: User._id, token });
        });
        // Login user
        this.login = ({ email, password }) => __awaiter(this, void 0, void 0, function* () {
            const { errors } = validators_1.ValidatorLoginInput(email, password);
            const user = yield User_model_1.USER.findOne({ email });
            if (!user) {
                errors.general = "User not found";
                throw new Error("User not found");
            }
            const match = yield bcryptjs_1.default.compare(password, user.password);
            if (!match) {
                errors.general = "Wrong credentials";
                throw new Error("Password incorrect");
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                username: user.username,
                email: user.email
            }, "hicham", { expiresIn: "1d" });
            return Object.assign(Object.assign({}, user._doc), { id: user._id, token });
        });
        // Verify Token
        this.isAuth = (req, res, next) => {
            const token = req.header('x-auth-token');
            // Check if not token
            if (!token) {
                return res.status(401).json({ msg: 'No token, authorization denied' });
            }
            // Verify token
            try {
                const decoded = jsonwebtoken_1.default.verify(token, "hicham");
                req.user._id = decoded.user;
                console.log(req.user._id);
                next();
            }
            catch (err) {
                res.status(403);
                return res.json({ err });
            }
        };
        // Get all users
        this.getUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield User_model_1.USER.find();
            if (users.length < 0) {
                return res.status(401).json({ msg: 'No Users exists' });
            }
            return users;
        });
        // Get user byID
        this.getUserByID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_model_1.USER.findById(req.user._id).select('-password');
            if (!user) {
                throw new Error("Related user details are not found");
            }
            return res.json(user);
        });
    }
}
exports.userController = new UserController();
