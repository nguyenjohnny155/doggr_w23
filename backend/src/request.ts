import url from "url";

export function request(httpModuleRequest){

    const parsedUrl = url.parse(`${httpModuleRequest.headers.host}${httpModuleRequest.url}`, true);
    const keys = Object.keys(parsedUrl);
    keys.forEach( (key) => httpModuleRequest[key] = parsedUrl[key]);

}

// www.doggr.com => www.doggr.com/admin
// server.use('/admin', aFunctionThatAuthenticates)
// server.use('/notAdmin', () => { console.log("not an admin page"); });
// server.use('*', () => { console.log("generic any path"); });
// middleware has to be executed sequentially


