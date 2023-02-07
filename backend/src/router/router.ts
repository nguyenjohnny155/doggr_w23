import { resourceLimits } from "worker_threads";
import { PathHandler } from "./pathHandler";
import { Route } from "./route";

// The purpose of the Router class is to combine the path's URL + HTTP Verb + its callback function argument
export class Router {
    // PathHandler is added for performance sake
    private stack: PathHandler[]; // This needs to be class Route, not PathHandler!
   
    constructor(){

        // Init class variables
        this.stack = [
            new PathHandler("*", (req, res) => {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end(`Cannot find ${req.url}`);
            }),
        ]
    }

    // iterate through PathHandlers looking for matching path with request path
    // if it has a routehandler with it, the route handler will be executed
    handle(req, res){
        const method = req.method;
        let found = false;

        this.stack.some((item, index) => {
            if (index === 0) {
                return false;
            }

            const { matched = false, params = {}} = item.match(req.pathname);

            if(matched && item.route && item.route.requestHandler(method)){
               found = true; 
               req.params = params;
               return item.handler(req, res); 
            }

        });

        return found ? null : this.stack[0].handler(req, res); 
    }


    createRoute(path){
        const route = new Route(path);
        const layer = new PathHandler(path, (req, res) => route.dispatch(req,res));
        layer.route = route;
        this.stack.push(layer);

        return route; 
    }

    get(path, handler){
        const route = this.createRoute(path);
        route.get(handler);
        return this;
    }

    post(path, handler){
        const route = this.createRoute(path);
        route.post(handler);
    }

    put(path, handler){
        const route = this.createRoute(path);
        route.put(handler);
    }

    delete(path, handler){
        const route = this.createRoute(path);
        route.delete(handler);
    }
}