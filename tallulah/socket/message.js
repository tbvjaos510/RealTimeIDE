/**
 * @param {SocketIO.Namespace} io
 */
var users = {};

function msgRouter(io){

    io.on('connection', function(socket){ 
        console.log('user connected: ', socket.id);               
        users[socket.id] = {
          room : 'main',
          name : socket.handshake.params.name
        }
        socket.on('disconnect', function(){ 
          console.log('user disconnected: ', socket.id);
          delete users[socket.id];
        });
        socket.on('join', function(data){
          users[socket.id].room=data;
          socket.join(data);
        });
        socket.on('chat', function(msg){ 
          socket.broadcast.in(users[socket.id].room).emit('chat', msg);
        });
      });
}

/**
 * 
 * @param {SocketIO.Server} io 
 * @param {String} router router link
 */
module.exports = function (io, router){
    var link = io.of(router);
    link.namespace = router;
    msgRouter(link);
    return link;
};