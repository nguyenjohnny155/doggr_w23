

/*
    // STATUS CODE
        200 = everything is okay
        404 = resource wasn't found
        301 = page has been moved elsewhere, redirect
        500 = general server error

*/

/*
    // HTTP REQUESTS
    1. As a frontend developer, we care about HTTP requests to bring data in and out of our web application.
    2. Types of requests (verbs)
        - GET is a `GET /index.html HTTP/1.1`
        - POST is a `POST /index.html HTTP/1.1`
        - PUT is a `PUT /index.html HTTP/1.1`
        - DELETE is a `DELETE /index.html HTTP/1.1`

    // POST - Create new user, add user to new admin role
        `POST /users HTTTP/1`
        `POST /users HTTP/1`

    // PUT - Change existing data
        `PUT /users age=3 HTTP/1`
    
    // DELETE - delete some data from server

*/

// When working with Async Programming, a these methods must be understood
// - FETCH()
// - THEN()
// - CATCH()
// - async (typedef) // introduced via ESLINT2017
// - await (typedef) // introduced via ESLINT2017

/*
    //Mandatory understanding:

    1. JS doesn't understand that promises are special types

    // ASYNC / AWAIT RULES
    1. if a function is executing methods that has promises, then 
        the main function must be typed async.

    2. Whenever invoking a function containing a promise, await must be declared PRIOR to the invoking function's name.
    
    3. functions that needs a promise are normally functions that perform tasks that may take a while to execute.
        - Database functions
            - Main Connection
            - Querying 
            - Connect to Database
            - Test connection

    
*/
/*
    Fun facts = every year eslint2017 introduces new javascript functions, but
                browsers are not up to date, so they struggle with javascript functions
*/

/*
let databaseReady = () => {
    // Javascript can also be written with just a resolve, implying that this promise will never fail
    return new Promise( (resolve,reject) => { 
        // imagine we do some database boot
        // lets fake it by pausing for 5 seconds

        setTimeout( () => resolve("Our fake database is ready"), 5000); 
    })
}

async function checkDatabase(){
    const dbStatus = await databaseReady();
    console.log("Database ready? ", dbStatus);
    return dbStatus;
}

checkDatabase();
*/
/*
// PROMISE USE CASE EXAMPLE
const getCatFactURL = "https://catfact.ninja/fact";

let getCatFact = url => {
    return new Promise( function(resolve, reject) {
        fetch(url) // returns our own promise from here
            .then( res => {
                if (res.status === 200){
                    resolve(res)
                }
                else (
                    reject(res.status)
                )
            })
            .catch( (err) => { // In the case the promise fails, catch is called and reject is called
                console.error("Unable to fetch: ", url);
                reject(err);
            })
    })
}

let finalData = getCatFact(getCatFactURL)
    .then( catData => catData.json()) // json() returns a promise, so it must be handled
    .then( jsonData => console.log(jsonData)); // .then is called after .json(), to handle the promise

// line 5 is a Promise
// fetch is a Promise
// calling .json() function returns a promise
*/

/*
NOTES

// Javascript is a single threaded language.
// - If you have 500 cores on your computer, it will only use one of them.

const { threadId } = require("worker_threads");

console.log("Hello World");
console.log("hi 2");

// JS code are often executed one line at a time. 
// If a method isn't defined to be async/await, 
// then certain function call can hang the application and make it uninteractable until the function is finished executing
//let fooUser = RemoteDatabase.GetUser(1);
//console.log(fooUser);


// Example of function declaration, and saving functions within variables
let myFunction = () => {
    console.log("Called my functoin")
}

myFunction();

// Example of calling a function variable within a js function
function runMyCallback(callback){
    callback();
}

runMyCallback(myFunction);

// This function is calling the callback function 3 seconds later
function GetUser(userId, finishedCallback) {
    //let user = RemoteDatabase.Get(userId);
    let user = {};

    // calling the callback function
    setTimeout(() => finishedCallback(user), 3000);
}

// This function is taking a callback function as a param
// this function is also defined as a variable, with a type function
let fooUser = GetUser(1, ( user ) => { // This callback function requires a user variable for its param
    console.log("Finished getting the user");
    // do things
})


// Example case of Callback hell
function GetAllUserInfo(userId, (user) => {
    if (user) GetUserCounty(user, (county) => {
        //
        //
        //
        //
        if (county) GetUserState(user, (state) => {
            //
            //
            //
            //
            if (state) GetUserCity( user, (city) => {
                // lol my eyes
            })
        })
    })
})

// Promises was invented by JS developers to make executing web pages faster.
// - Also acts as a solution to handle Callback hell
// - Promises won't be written often
// - resolve and reject are MANDATORY. If they do not exist, the promise will forever hang and never ends
let userPromise = new Promise(function ( resolve, reject ){
    let user = { name: "my user name" }
    
    // getting user from database

    // if a user was found in the database
    if (user) {
        resolve(user)

    // if a user was NOT found in the database
    } else {
        reject( "user not found" );
    }
})

// then() catch() finally()
userPromise.then()

// Automatically executed when resolve() is called
userPromise.then( (result) => {
    console.log("Successfully found user: ", result);
})

// Referencing json objects by string names, and getting a specific element data
// - Its good in mind to view JS objects as dictionary types
let myJSONObj = {
    name: "Johnny",
    age: 25
} 

let myNewVariable = myJSONObj["name"];
*/
