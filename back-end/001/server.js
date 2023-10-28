const http = require('http');

let requestCounter = 0;

const server = http.createServer((request, response) => {

    requestCounter++;

    switch (request.url) {
        case '/':
        case '/hello':
            response.write('Hello, world! This is reques number: ' + requestCounter)
            break;
        case '/about':
            response.write('It is about page. This is reques number: ' + requestCounter)
            break;
        case '/payment':
            response.write('Hahaha! All your money is mine now!. This is reques number: ' + requestCounter)
            break;
        default:
            response.write('404 page not found. This is reques number: ' + requestCounter)
    }

    response.end()
})

server.listen(3003)