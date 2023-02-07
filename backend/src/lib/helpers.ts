export function checkMiddlewareInputs(args) {
    let path = "*";
    let handler = null;

    if(args.length === 2) [path, handler] = args;
    else handler = args[0];

    if (typeof path !== "string")
        throw new Error("Path needs to be either a string");
    else if (typeof handler !== "function")
        throw new Error("Middleware needs to be a function");

    return {
        path,
        handler
    };
}

// if path match, return true. execute middleware
// if path doesn't match, return false. don't execute middleware
export function matchPath(setupPath, currentPath){
    const setupPathArray = setupPath.split("/");
    const currentPathArray = currentPath.split("/");

    let match = true;
    const params = {}; 

    for (let i = 0; i < setupPathArray.length; i++){
        const route = setupPathArray[i];
        const path = currentPathArray[i];

        // ":" imply that there is a parameter of data to collect
        // Example: app.get("/users/:myUser", myFn)
        //          doggr.com/users/cb@pdx.edu
        if(route[0] === ":"){
            params[route.substr(1)] = path; // parameters are stored in here
        } else if (route === "*"){
            break;
        } else if( route !== path){
            match = false;
            break;
        } 
    }

    const isMatch = match ? {matched: true, params} : {matched: false}; 

    return isMatch;
}