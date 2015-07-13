//
// serveur
//

//modules
var http = require('http');
var path = require('path');
var fs = require('fs');

//port d'écoute
var port = process.argv[2];

// stream de l'image
var imgStream = fs.createReadStream(process.argv[3]);

//extension pour le header de la réponse
var ext = ("image" + path.extname(process.argv[3])).replace('.','/');

//array de peerIDs des client connectés
var connections = [];

// vérifie si l'array de IDs ne contient pas la nouvelle ID que l'on cherche à rajouter
function addIDToList(peerID)
{
    var index = undefined;

    for (index = 0 ; connections[index] ; index++) {
		if (connections[index] === peerID)
			return false;
    }
    connections[index] = peerID;
    return true;
}

var server = http.createServer(function (request, response) {

    //récupération de la peer ID
	var incomingID = undefined;
	request.on('data', function (chunk) {
		incomingID += chunk;
	});
	request.on('end', function () {
		addIDToList(incomingID);
	});
    //si il n'y a pas eu de connections précédemment, on envoie directement l'image
    if (connections.length == 0)
    {
		response.writeHead(200, {'Content-type' : ext});
		imgStream.pipe(response);
    }
    else //si il y a eu des connections antérieures, on envoie la liste des peer IDs
    {
		response.writeHead(203, {'Content-type' : 'text/plain'});
		response.end(connections.join());
    }
});
server.listen(port);
