
var users = {};
global.rooms = {};
/**
 * @param {SocketIO.Namespace} io
 */
function msgRouter(io) {

  io.on('connection', function (socket) {
    console.log('user connected: ', socket.id);
    users[socket.id] = {
      room: [],
      name: socket.handshake.query.name
    }
    socket.name = users[socket.id].name;
    socket.on('disconnect', function () {
      console.log('user disconnected: ', socket.id);
      delete users[socket.id];
    });
    socket.on('join', function (data) {
      if (!rooms[data]){
        rooms[data] = [];
      }
      users[socket.id].room.push(data);
      socket.join(data);
    });
    socket.on('chat', function (data) {
      console.log(data);
      data.name = socket.name;
      rooms[data.room].push(data);
      socket.broadcast.in(data.room).emit('chat',data);
    });
    socket.on('getchat', function(data){
      socket.emit('chattings', rooms[data]);
    })
    socket.on('error', function(data){
      socket.disconnect();
    })
    socket.on('forceDisconnect', function () {
      socket.disconnect();
  })
    socket.on('change', function(data){
      socket.broadcast.in(data.room).emit('refresh');
    })
  });
  io.on('error', function(){

  })
  
}

/**
 * 
 * @param {SocketIO.Server} io 
 * @param {String} router router link
 */
module.exports = function (io, router) {
  var link = io.of(router);
  link.namespace = router;
  msgRouter(link);
  return link;
};