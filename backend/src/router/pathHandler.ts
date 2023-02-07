// GET doggr.com/users
// "/users"
// GET
// handler

import { matchPath } from "../lib/helpers";
import { Route } from "./route";

export class PathHandler{

// Class members
    name: string;
    path: string;
    route: Route;
    method: string;
    handler: any;

// Constructor
    constructor(path, handler) {
        this.path = path;
        this.handler = handler;

        this.name = handler.name || "<anonymous>";
    }

// If the current request path matches our PathHandler's path, then run its handle function
    requestHandler(...args){
        const handler = this.handler;
        handler ? handler(...args) : null;
    }

    match(path){
        return matchPath(this.path, path);
    }
}

