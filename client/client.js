
document.domain = "http://127.0.0.1:5000";
var peer = new Peer({key: 'lwjd5qra8257b9'});
var serverIp = "http://127.0.0.1:5000";
var serverPort = "5000";
var peerList = [];
var _data = undefined;


function p2pUpload()
{
	peer.on('connection', function(conn) {
		conn.on('open', function(data) {
			conn.send(_data);
			});
		});
}

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

function connectToServer()
{
	$.get(serverIp, function(data, status, xhr) {
		if (xhr.status == 200)
		{
			_data = data;
			$('#imgDiv').html(_data);
			p2pUpload();
		}
		else if (xhr.status == 203)
		{
			_data = data;
			peerList = data.split(',');
			p2pDownload();
		}
		else
		{
			alert("Something went wrong.");
		}
		});	
}

$(document).ready(function() {
	
	connectToServer();
	});	
