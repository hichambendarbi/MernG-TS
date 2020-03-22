import Server from './server'
// import config from 'config';

// const db: string = config.get('server.mongoURI');
// const port: number = config.get('server.port');

// const PORT = +TEST;
// const port = 5000
// const mongoURI = "mongodb+srv://hicham123:hicham123@cluster0-fgwnk.mongodb.net/test?retryWrites=true&w=majority"
// Instanciate a new Server
const server = new Server(9000);
server.connect("mongodb+srv://hicham123:hicham123@cluster0-fgwnk.mongodb.net/test?retryWrites=true&w=majority");
server.start();