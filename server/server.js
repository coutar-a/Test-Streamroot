var http = require('http');
var path = require('path');
var fs = require('fs');
var port = process.argv[2];
var imgStream = fs.createReadStream(process.argv[3]);
var ext = "image" + path.extname(process.argv[3]);
ext = ext.replace('.', '/');

var connections = [];
var i = 0;

function addIpToList(IpAddress)
{
    var index = undefined;

    for (index = 0 ; connections[index] ; index++) {
	if (connections[index] === IpAddress)
	    return false;
    }
    connections[index] = IpAddress;
    return true;
}

var server = http.createServer(function (request, response) {
    if (connections.length == 0) {
	addIpToList(request.connection.remoteAddress);
	//connections[i++] = request.connection.remoteAddress;
	//console.log(connections[i - 1]);
	response.writeHead(200, {'Content-type' : ext});
	imgStream.pipe(response);
    }
    response.writeHead(200, {'Content-type' : 'text/plain'});
    imgStream.pipe(connections.join());
});
server.listen(port);
