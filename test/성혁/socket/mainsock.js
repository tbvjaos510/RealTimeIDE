
/**
 * 
 * @param {SocketIO.Server} io 
 */
module.exports = function(io){
    io.on('connection',function(socket){
        console.log('Socket Connected : ' + socket.id);
        socket.on('data',function(data){
            console.log('data : ' + data);
            io.emit('data', data);
        });
    });
};