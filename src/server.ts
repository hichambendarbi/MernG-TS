import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import graphQLHTTP from "express-graphql";
import {buildSchema} from "graphql";
import {USER} from '../models/User.model'

var users : any = []


var schema = buildSchema(`
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
    users: () => {
      return users;
    },
    createUser: ({ userInput }: any) => {
    const user = new USER({
        name : userInput.name,
        email: userInput.email,
        date : userInput.date
    });
    console.log(user)
    
 const newUser =   user.save();
 return newUser;
  }
}

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
        app.use('/graphql', graphQLHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true
        }))
        // route for GET /
        // returns a string to the client
        app.get('/', (request: express.Request, response: express.Response) => {
            response.send("Hello user");
        });


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