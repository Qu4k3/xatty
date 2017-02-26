var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// middle wear
app.use(express.static('client'));

app.get('/home', function(req, res){
  res.status(200).send('hola mundo');
});

var messages = [{
  id: 1,
  text: 'Bienvenido',
  nickname: 'Bot - quake'
}];

// abrir conexión al socket
io.on('connection', function(socket){
  console.log("El nodo con IP: "+socket.handshake.address+" se ha conectado...");

  socket.emit('messages', messages);

  socket.on('add-message', function(data){
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(6677, function() {
  console.log('Servidor está funcionando en http://localhost:6677');
});
