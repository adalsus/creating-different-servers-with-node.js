"use strict";

//A simple server with a request event listener in main.js

const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer();

//Expresión de Función que retorna convertido el objeto(JSON) JavaScript en string
const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

app.on("request", (req, res) => {


    //Handling posted request data in main.js
    //Observación para pasarle el data y se vea, hay que abrir otra terminal
    //y enviarle un post usando comando curl, se debe instalarlo este nuevo comando(curl)
    //ya instalado(curl) se lo usa así:
    //curl --data "username=ADALSUS&password=secret" http://localhost:3000
    //En terminal powershell así:
    //curl http://localhost:3000 -Method Post -d -Body "username=ADALSUS&password=secret"
    var body = [];
    req.on("data", bodyData => {
        body.push(bodyData);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${body}`);
        //La data enviada; por consola se vería así:
        //Request Body Contents: username=ADALSUS&password=secret
    });


    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Headers: ${getJSONString(req.headers)}`);



    res.writeHead(httpStatus.OK/*200*/, {
        "Content-Type": "text/html"
    });

    let responseMessage = "<h1>This will show on the screen.</h1>";
    res.end(responseMessage);
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);