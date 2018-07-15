/**
 * @param {SocketIO.Namespace} io
 */

function msgRouter(io){

    io.on('connection', function(socket){ 
        console.log('user connected: ', socket.id);               
      
        socket.on('disconnect', function(){ 
          console.log('user disconnected: ', socket.id);
        });
      
        socket.on('send message', function(msg){ 
          io.emit('receive message', msg);
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