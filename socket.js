var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

var handler = (req, res) => {
    fs.readFile(__dirname + '/index.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error Loading Page');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
};

var app = http.createServer(handler);
var io = socketio.listen(app);

io.sockets.on('connection', (socket) => {
  setInterval(function() {
    var timestamp = Date.now();
    console.log('Emitted: ' + timestamp);
    socket.emit('timer', timestamp);
  }, 2000);
  socket.on('submit', (data) => {
    console.log('Submitted: ' + data);
  });
});
app.listen(8085);

console.log('Server running!');