const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    switch (request.url) {
        case '/':
        case '/index':
            //open index.html
            response.end();
            break;
        default:
            response.write('404 - page not found');
            response.end();
    }
});

server.listen(3004);
