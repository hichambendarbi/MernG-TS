import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import routes from "./routes";

export default class Server {
    // private variable named "port" and its type must be number
    private port: number

    constructor(port:number){
        this.port = port;
    }

    /**
     * Starts the server and does not return anything
     */
    public start(): void {

        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use('/', routes(express.Router()));

        // Server is listening to port defined when Server was initiated
        app.listen(this.port, () => {
            console.log("Server is running on port " + this.port);
        });

    }

    public connect(db: string): void {
        const connect = async () => {
                try {
                    await mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology: true })
                    return console.info(`Successfully connected to mongoDB`);
                } catch (err) {
                    console.error(`Error connecting to database :`,err);
                    return process.exit(1);
                }
        };

        connect();

        mongoose.connection.on('disconnected',connect);
    }
}