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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_1 = require("graphql");
const User_model_1 = require("./models/User.model");
// var users : any = []
var schema = graphql_1.buildSchema(`
type USER {
    _id: ID!
    name: String!
    email: String!
    date : String!
}

input UserInput {
    name: String!
    email: String!
    date : String!
}

type RootQuery {
users: [USER!]!
}

type RootMutation {
    createUser(userInput: UserInput) : USER
}

schema {
    query:RootQuery
    mutation:RootMutation
}
`);
var root = {
    users: () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield User_model_1.USER.find();
        return users;
    }),
    createUser: ({ userInput }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_model_1.USER({
            name: userInput.name,
            email: userInput.email,
            date: userInput.date
        });
        const newUser = yield user.save();
        return newUser;
    })
};
class Server {
    constructor(port) {
        this.port = port;
    }
    /**
     * Starts the server and does not return anything
     */
    start() {
        const app = express_1.default();
        app.use(body_parser_1.default.json());
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            }
            next();
        });
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.all('/graphql', express_graphql_1.default({
            schema: schema,
            rootValue: root,
            graphiql: true
        }));
        // route for GET /
        // returns a string to the client
        app.get('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const users = yield User_model_1.USER.find();
            response.json(users);
            response.send(users);
        }));
        // Server is listening to port defined when Server was initiated
        app.listen(this.port, () => {
            console.log("Server is running on port " + this.port);
        });
    }
    connect(db) {
        const connect = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
                return console.info(`Successfully connected to mongoDB`);
            }
            catch (err) {
                console.error(`Error connecting to database :`, err);
                return process.exit(1);
            }
        });
        connect();
        mongoose_1.default.connection.on('disconnected', connect);
    }
}
exports.default = Server;
