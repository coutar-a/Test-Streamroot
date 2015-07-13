//
// client
//

//document.domain = "http://127.0.0.1:5000";

//création du pair PeerJS
var peer = new Peer({key: 'lwjd5qra8257b9'});

//adresse serveur
var serverIp = "http://127.0.0.1:5000";

//liste de pairs
var peerList = [];

//buffer pour les données reçues du serveur
var _data = undefined;

//ID PeerJS du client
var PeerID = undefined;

peer.on('open', function(id) {
  peerID = id;
});

//upload de l'image vers les pairs
function p2pUpload()
{
	peer.on('connection', function(conn) {
		conn.on('open', function(data) {
			conn.send(_data);
			});
		});
}

//connection et téléchargement sur un pair choisi au hasard dans la liste,
// puis passage en mode upload
function p2pDownload()
{
		var peerIndex = Math.floor(Math.random() * peerList.length);
		var conn = peer.connect(peerList[peerIndex]);
		conn.on('open', function(data) {
			conn.on('data', function (data) {
				_data = data;
				$('#imgDiv').html(_data);
				p2pUpload();
				});
			});
}

//connection au serveur 
function connectToServer()
{
    //requete HTTP - échoue (Erreur CORS)
	$.get(serverIp, PeerID, function(data, status, xhr) {
		if (xhr.status == 200)
		{
		    //téléchargement direct et affichage
			_data = data;
			$('#imgDiv').html(_data);
			p2pUpload();
		}
		else if (xhr.status == 203)
		{
		    //téléchargement p2p
			_data = data;
			peerList = data.split(',');
			p2pDownload();
		}
		else
		{
		    //erreur
			alert("Something went wrong.");
		}
		});
}

$(document).ready(function() {
	connectToServer();
	});
