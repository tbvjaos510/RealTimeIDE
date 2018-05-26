
/**
 * 
 * @param {SocketIO.Server} io 
 */
module.exports = function(io){
    io.on('connection',function(socket){
        socket.inroom = 'room1';
        socket.join(socket.inroom);
        socket.on('room', function(data) {
            socket.leave(socket.inroom);
            console.log('inroom' + data);
            socket.inroom = data;
            socket.join(data);
        });

        console.log('Socket Connected : ' + socket.id);

        socket.on('data',function(data){
            console.log('data : ' + data);
            io.to(socket.inroom).emit('data', data);
        });
    });
};