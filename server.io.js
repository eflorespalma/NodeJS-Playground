var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var path = require('path');
extensions = {
	".html" : "text/html",
	".css" : "text/css",
	".js" : "application/javascript",
	".png" : "image/png",
	".gif" : "image/gif",
	".jpg" : "image/jpeg"
};
 
 function getFile(filePath,res,page404,mimeType){
	fs.exists(filePath,function(exists){
		if(exists){
			fs.readFile(filePath,function(err,contents){
				if(!err){
					res.writeHead(200,{
						"Content-type" : mimeType,
						"Content-Length" : contents.length
					});
					res.end(contents);
				} else
					console.dir(err);
			});
		} else {
			fs.readFile(page404,function(err,contents){
				if(!err){
					res.writeHead(404, {'Content-Type': 'text/html'});
					res.end(contents);
				} else
					console.dir(err);
			});
		};
	});
};


function requestHandler(req, res) {
	var fileName = path.basename(req.url) || 'index.html',
	ext = path.extname(fileName),
	localFolder = __dirname + '/public/',
	page404 = localFolder + '404.html';
 
	if(!extensions[ext]){
		res.writeHead(404, {'Content-Type': 'text/html'});
         /*Renderizó un HTML en caso no se encuentre el mimeType */
		res.end("&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;The requested file type is not supported&lt;/body&gt;&lt;/html&gt;");
	};
	getFile((localFolder + fileName),res,page404,extensions[ext]);
};

var app = http.createServer(requestHandler);
var io = socketio.listen(app);

io.sockets.on('connection', (socket) => {
    socket.on('print', (data) => {
        console.log('Data Printed: ' + data);
        io.sockets.emit('broad',data);
    });

});
app.listen(8085);
console.log('Server running!');