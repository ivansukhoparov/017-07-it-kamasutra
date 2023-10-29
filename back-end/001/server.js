const http = require('http');
const fs = require('fs');

let requestCounter = 0;


const server = http.createServer((request, response) => {
    switch (request.url) {
        case '/':
        case '/hello':
            response.end(messasge('Hello, world!'));
            break;
        case '/about':
            response.end(messasge('It is about page.'));
            break;
        case '/payment':
            response.end(messasge('Hahaha! All your money is mine now!'));
            break;
        default:
            const filePath = request.url.substring(1);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    response.statusCode = 404;
                    response.end('404 - Resourse not found.');
                } else {
                    response.end(data)
                }
            })
    }
})

let messasge = function (msg) {
    requestCounter++;
    return msg + ' This is reques number: ' + requestCounter
}

server.listen(3003)