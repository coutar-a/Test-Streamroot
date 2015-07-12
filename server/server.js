var http = require('http');
var path = require('path');
var fs = require('fs');
var port = process.argv[2];
var imgStream = fs.createReadStream(process.argv[3]);
var ext = ("image" + path.extname(process.argv[3])).replace('.','/');

var connections = [];

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
    if (connections.length == 0)
    {
		addIpToList(request.connection.remoteAddress);
		response.writeHead(200, {'Content-type' : ext});
		imgStream.pipe(response);
    }
    else
    {
		response.writeHead(203, {'Content-type' : 'text/plain'});
		response.end(connections.join());
    }
    for (var index = 0; connections[index] ; index++)
		console.log(connections[index]);
});
server.listen(port);
