var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(8090);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
//  socket.emit('news', { hello: 'world' });
  socket.on('message', function (data) {
    console.log(data);
   // socket.emit('msg',data);
    socket.broadcast.emit('msg',data);
  });
  socket.on('pageTotal',function(data){
     socket.broadcast.emit('pageTotal',data);
  });
});
