"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const config_1 = __importDefault(require("config"));
const db = config_1.default.get('server.mongoURI');
const port = config_1.default.get('server.port');
// const PORT = +TEST;
// const port = 5000
// const mongoURI = "mongodb+srv://hicham123:hicham123@cluster0-fgwnk.mongodb.net/test?retryWrites=true&w=majority"
// Instanciate a new Server
const server = new server_1.default(port);
server.connect(db);
server.start();
