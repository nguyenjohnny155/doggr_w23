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
import {request} from "./request"
import {response} from "./response"

// export declaration allows us to reference this function from outside files.
export function Nastify(){
    async function listen(port=8080, cb){
        return http.createServer(async (req, res) => {

            request(req);
            response(res);
            
            const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'index.html'))
                .catch(err => {
                    console.error(err);
                    res.setHeader('Content-Type', 'text/html');
                    res.writeHead(500);
                    return res.end(err);
                })

            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            return res.end(indexFile);
        }).listen({port}, () => {
            if (cb) {
                if (typeof cb === 'function') {
                    return cb();
                }
                throw new Error('Listen callback needs to be a function');
            }
        });
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