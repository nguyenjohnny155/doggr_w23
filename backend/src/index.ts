import http from "http" // comes prepackaged from Node.js
import * as dotenv from "dotenv"
dotenv.config();

//import fs from "fs" // introduce a NON await/async file read
import fs from "fs/promises" // introduce an await/async file read promise
import path from "path"

// This method is responsible for listening to all request done to our server
const server = http.createServer(async (req, res) => {
    // path.resolve(__dirname, 'public', 'index.html') => /Desktop/Apps/fullstack-webdev-my-version/frontend
    // __dirname references the current directory in which this file resides.
    // for security reasons, node won't let us out of the src folder in the case where i'd like to traverse backwards in directory
    // __dirname allows us to pull in the entire path, allowing portability by generating a path unique for every client that runs this app

    // New Synchronous way to read files
    const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'index.html'))
        .catch( err => {
            console.error(err);
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(500);
            return res.end(err);
        });

    // We can now assume that indexFile holds the contents of the file
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    return res.end(indexFile);

    /*
    //OLD Synchronous way to read file
    fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data)=> {
        res.setHeader("Content-Type", "text/html");

        // Executed if file not found | file read error
        if (err) {
            res.writeHead(500);
        }
        
        res.writeHead(200);
        return res.end(data);
    })
    */
});

// process.env.PORT - goes into the .env file and grabs the PORT variable's value. this value will get assigned to the localhost url: "localhost:PORT"
server.listen(process.env.PORT, () => {
    console.log("Listening...");
})


/*
import { App } from "./app";
import { FastifyInstance } from "fastify";

const app: FastifyInstance = App({
    logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty'
        }
    }
});

const host_addr = '0.0.0.0';
app.listen({port: 3000, host: host_addr}, (err, _address) => {
    if(err){
        app.log.error(err);
        process.exit();
    }

    const msg = `Server listening on '${host_addr}' ...`;
    console.log(msg);
    app.log.info(msg);
})

*/