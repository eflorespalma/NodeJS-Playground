const http = require('http');

const port = 8085;
const hostname = '127.0.0.1'

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Hello NodeJS");
});

server.listen(port, hostname, () => {
    console.log('Server Running Without Express at Port ' + port);
});