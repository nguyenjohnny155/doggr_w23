// class of functions are the same as functions of functions
// doggr.com/admin
import { PathHandler } from "./pathHandler";

// Declaring new Type (typescript syntax)
type MethodMap = {
    [id:string]: boolean;
}

export class Route {
// Class members
    path: string; // typescript syntax
    stack: PathHandler[]; // all of the handlers that apply SPECIFICALLY TO THIS PATH ^
    methods: MethodMap; // a collection of all http verbs tied to "/admin" // key ("GET") value(bool) // js map: [id:string]: boolean

// Constructor
    constructor(path) {
        // initialize class members to initial values
        this.path = path;
        this.stack = [];
        this.methods = {};
    }

// GET function
    get(handler){
        const ph = new PathHandler("/", handler);
        ph.method = "get";
        this.methods['get'] = true;
        this.stack.push(ph);
        return this;
    }

// POST function
    post(handler){
        const ph = new PathHandler("/", handler);
        ph.method = "post";
        this.methods['post'] = true;
        this.stack.push(ph);
        return this;
    }

// PUT function
    put(handler){
        const ph = new PathHandler("/", handler);
        ph.method = "put";
        this.methods['put'] = true;
        this.stack.push(ph);
        return this;
    }

// DELETE function
    delete(handler){
        const ph = new PathHandler("/", handler);
        ph.method = "delete";
        this.methods['delete'] = true;
        this.stack.push(ph);
        return this;
    }


// Handler function
    requestHandler(method){
        const name = method.toLowerCase();
        return Boolean(this.methods[name]);

        // let FakeMethod = this.methods["HARRY"]
        // FakeMethod === null
        // return Boolean(null) => false
    }

    dispatch(req, res){
        const method = req.method.toLowerCase();

        this.stack.forEach((item) => {
            if (item.method === method){
                item.requestHandler(req, res);
            }
        })
        
        // Similar to the forEach loop above
        //for (let i = 0; i < this.stack.length; i++){
        //    if(method === this.stack[i]){
        //        this.stack[i].requestHandler(req, res);
        //    }
        //}

    }


}

// above code is the same as => public class Route { private string path; }


/*
// Facts:
1. Javascript allows us to make mistakes and their compiler won't throw an error.
2. typescript compiler won't let us make mistakes and will throw an error if incorrect code/syntax
*/