import express from "express";
import Server from './server'



const app: express.Application = express();


const server = new Server(9000);
server.connect("mongodb+srv://hicham123:hicham123@cluster0-fgwnk.mongodb.net/test?retryWrites=true&w=majority");
server.start();