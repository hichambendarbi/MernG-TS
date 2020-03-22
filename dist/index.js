"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
// import config from 'config';
// const db: string = config.get('server.mongoURI');
// const port: number = config.get('server.port');
// const PORT = +TEST;
// const port = 5000
// const mongoURI = "mongodb+srv://hicham123:hicham123@cluster0-fgwnk.mongodb.net/test?retryWrites=true&w=majority"
// Instanciate a new Server
const server = new server_1.default(9000);
server.connect("mongodb+srv://hicham123:hicham123@cluster0-fgwnk.mongodb.net/test?retryWrites=true&w=majority");
server.start();
