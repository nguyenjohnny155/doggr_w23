// Uses express to create HTTP verb endpoints, so that the client has access points to the server.
// typescript by default, will assign an 'any' type to a declared variable. during execution/compile time, typescript will automatically give
//      give the variable its correct type

/*
// https://expressjs.com/en/starter/hello-world.html?sort=newest?country=en_us
    - https:// | PROTOCOL
    - expressjs.com | BASE DOMAIN / HOST
    - /en/starter/hello-world.html | PATH
    - ?sort=newest?country=en_us | QUERIES / PARAMETERS

*/

// this file shows us how to EXPRESSIFY our backend
import http from "http";
import fs from "fs/promises";
import path from "path";
import { request } from "./request"
import { response } from "./response"
import { checkMiddlewareInputs, matchPath } from "./lib/helpers";
import { Router } from "./router/router";

// export declaration allows us to reference this function from outside files.
export function Nastify(){

    // Whenever a user sends an HTTP request, we must know all of the middleware which applies to that request. 
    // All of the middleware that applies to an HTTP request will get stacked onto this array, so the handler will know
    // which middleware to run.
    // Middleware also behaves similarly to vectors in C++.
    const middlewares = [];
    const router = new Router();

    async function listen(port=8080, cb){
        return http
            .createServer(async (req, res) => {

            request(req); // request url is parsed, and allocate an object w. NodeJS functions that returns our desired object
                            // in JS, even when an object is allocated, more elements can be added to it.

            response(res); // our express response object doesn't have all the elements we need,
                            // so we will pass res object into our own response function to add the elements
                            // we need.

            handleMiddleware(req, res, () => router.handle(req, res)); // handle iterating through middlewares array and execute all middleware functions

        }).listen({port}, () => {
            if (cb) {
                if (typeof cb === 'function') {
                    return cb();
                }
                throw new Error('Listen callback needs to be a function');
            }
        });
    }

    function handleMiddleware(req, res, cb){
        //handle middlewares here
        req.handler = cb;
        const next = findNext(req, res);
        next(); // this is the same as findNext(req, res)(); the reason being is because we're not beinding the function to any variable. 
        //findNext(req, res)(); // this is the same as next(); this notation allows us to execute a function without binding it to a variable.
    }

    // Points to the next middleware via recursion. 
    /*
        app.use("/admin", () => ValidateInputs());
        app.use("/admin", () => DBSanitize());
        middlewares => [ValidateInputs, DBSanitize]
        this.middlewares[0] => ValidateInputs;
    */
    function findNext(req, res){
        let current = -1;

        const next = () => {
            current += 1; 
            const middleware = middlewares[current];

            // Javascript does not tell us that we're out of an index bound, so we have to write the code below to check if a pointer is out of bound
            const { matched = false, params = {} } = middleware ? matchPath(middleware.path, req.pathname) : {};

            if ( matched ) {
                console.log("Middleware for path found");
                req.params = params;
                middleware.handler(req, res, next); // middleware index functions are executed here
            } else if (current <= middlewares.length){
                next();
            } else {
                // we're done w/ middleware execution
                req.handler(req, res);
            }
        }

        return next;
    }


    // ...args imply that I can pass any # of parameters in the use function
    // use()
    // use("hello")
    // use("hello", 7, () => {console.log("hi")})
    // javascript will not save me if i don't do typechecks
    /*
    function use(...args) {
        // This function will add a middleware to some particular path

        let path = "*";
        let handler = null;
        
        // Validate the quantity of the arguments
        if ( args.length === 2 ) [path, handler] = args;

        // Validate if the handler is a type = function
        if ( typeof handler !== 'function') throw new Error("Middleware has to be a function");

        // Validate if the path is a type = string
        if ( typeof path !== 'string') throw new Error("Path is not a string");

        this.middlewares.push({
            path,
            handler
        })

    }
    */

    function use(...args){
        const {path, handler} = checkMiddlewareInputs(args);

        middlewares.push({
            path, 
            handler
        });
    }

    function get(...args) {
        const {path, handler} = checkMiddlewareInputs(args);
        return router.get(path, handler);
    }

    function post(...args) {
        const {path, handler} = checkMiddlewareInputs(args);
        return router.post(path, handler);
    }

    // Implement put here
    function put(...args) {
        const {path, handler} = checkMiddlewareInputs(args);
        return router.put(path, handler);
    }

    
    // Implement delete here
    function _delete(...args){
        const {path, handler} = checkMiddlewareInputs(args);
        return router.delete(path, handler);
    }
    

    return {
        listen,
        use,
        get,
        post,
        put,
        _delete
    }

}

/*
    function in a function
    - allows users to declare functions in a function, aswell as returning functions in a function
    - similar to a class

    function baseFunction() {
        function childFunction1(){
            return "child1";
        }

        function childFunction2(){
            return "child2";
        }

        function childFunction3(){
            return "child3";
        }

        return {
            childFunction1,
            childFunction2,
            childFunction3
        }
    }

*/


/*
    In javascript, functions and variables are treated similar. Both can be store in a variable

    let var1 = 5;
    let var2 = functionObj;
*/