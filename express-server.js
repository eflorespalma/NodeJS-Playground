var express = require('express');
var app = express();


app.get('/', (request, response) => {
    response.send('Hello World From Express Server.');
});

app.listen(8085, () =>{
    console.log('Server running with Express Server');
});