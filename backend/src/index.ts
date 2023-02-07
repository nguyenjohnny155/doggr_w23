import http from "http" // comes prepackaged from Node.js
import * as dotenv from "dotenv"
dotenv.config();

import cors from "cors";

//import fs from "fs" // introduce a NON await/async file read
import fs from "fs/promises" // introduce an await/async file read promise
import path from "path"
import { Nastify } from "./nastify";
//import {Fastify} from "./fastify";

const app = Nastify();

app.use("/about", cors()); // adds the cors middleware to the path /about
app.use("/get", cors());
app.use("/users", cors());


// [/About]
app.get("/about", (req, res) => {
    res.send("I am the about page");
});

app.post("/about", (req, res) => {
    res.send("I am THE POST REQUEST");
});


// [/Users]
// users in memory database
let users = [];
app.get("/users", async (req, res) => {
    const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'users.html'))
        .catch(err => {
            console.error(err);
            res.setHeader('Content-Type', 'text/html');
            res.status(500).send("Error occurred", err);
        });

    console.log(users);
    res.status(200).send(indexFile);
});


app.post("/users/:userID", async (req, res) =>{
    // [x] Does not return an html file. 

    // [x] Handler must wait 3 second then return a response saying "POST to users waited 3 seconds"
    await setTimeout(function(){
        res.send("POST To Users waited 3 Seconds");
        console.log("POST To Users waited 3 Seconds");

        users.push(req.query.userID);

        // [x] Return status code 200
        res.status(200);
    }, 3000);

});

app.put("/users/:userID", (req, res) => {
    // Similar to post, but wait 2 seconds instead of 3
    setTimeout(function(){
        res.send("PUT To Users waited 2 Seconds");
        console.log("PUT To Users waited 2 Seconds");
    }, 2000);
 
    // Return status code 200
    res.status(200);
});

app._delete("/users/:userID", async (req, res)=> {
    // return status code 200

    // Handler must generate a random number 50% of the time.
    if( Math.random() >= 0.5 ){

        let i = 0;
        let found = 0;
        await users.forEach((user)=>{
            if(user === req.query.userID){
                users.splice(i, 1);
                found = 1;
            }
            ++i;
        })

        // User Not Found
        if( found === 0 ){
            res.send(`User ${req.query.userID} Does not exist in Users DB.`);
            console.error(`User ${req.query.userID} Does not exist in Users DB.`);
            res.status(500);
        
        // User Found
        } else {
            res.send(`DELETED ${req.query.userID} user.`);
            console.log(`DELETED ${req.query.userID} user.`);
            res.status(200);
        }

    } 
    // 50% Chance for deletion failure 
    else {
        setTimeout(function(){
            res.send(`User ${req.query.userID} NOT FOUND!`);
            console.error(`User ${req.query.userID} NOT FOUND!`);
            res.status(500);
        }, 2000);
    }
});

// [/]
app.get("/", async (req, res) => {
    const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'index.html'))
        .catch(err => {
            console.error(err);
            res.setHeader('Content-Type', 'text/html');
            res.status(500).send("Error occurred", err);
        });

    res.status(200).send(indexFile);
});

// TODO - MODIFY THIS!!! MAYBE lol
app.get("/get", async (req, res) => {
    const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'index.html'))
        .catch(err => {
            console.error(err);
            res.setHeader('Content-Type', 'text/html');
            return res.status(500).send("Error occurred", err);
        });

    return res.status(200).send(indexFile);
});



async function main() {
    const server = await app.listen(8080, () => {
        console.log("Server is running");
    })
};

void main();

/*
// This method is responsible for listening to all request done to our server
const server = http.createServer(async (req, res) => {
    // path.resolve(__dirname, 'public', 'index.html') => /Desktop/Apps/fullstack-webdev-my-version/frontend
    // __dirname references the current directory in which this file resides.
    // for security reasons, node won't let us out of the src folder in the case where i'd like to traverse backwards in directory
    // __dirname allows us to pull in the entire path, allowing portability by generating a path unique for every client that runs this app

    // New asynchronous way to read files
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
});
*/

/*
// process.env.PORT - goes into the .env file and grabs the PORT variable's value. this value will get assigned to the localhost url: "localhost:PORT"
server.listen(process.env.PORT, () => {
    console.log("Listening...");
})
*/


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