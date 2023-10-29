const http = require('http');
const fs = require('fs');

let requestCounter = 0;
const testFilePath = "index.html";

const server = http.createServer((request, response) => {
    if (request.url != '/favicon.ico') {
        requestCounter++;
    }

    switch (request.url) {
        case '/':
        case '/hello':
            response.write('Hello, world! This is reques number: ' + requestCounter);
            response.end();
            break;
        case '/about':
            response.write('It is about page. This is reques number: ' + requestCounter);
            response.end();
            break;
        case '/payment':
            response.write('Hahaha! All your money is mine now!. This is reques number: ' + requestCounter);
            response.end();
            break;
        default:
            const filePath = request.url.substring(1);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    response.statusCode = 404;
                    response.end('404 - Resourse not found. This is reques number: ' + requestCounter);
                } else {
                    response.end(data)
                }
            })
    }
})

server.listen(3003)