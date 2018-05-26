
/**
 * 
 * @param {SocketIO.Server} io 
 */
module.exports = function(io){
    io.on('connection',function(socket){
        

        socket.on('room',function(data){
            socket.inroom == 'room1';
            socket.join(socket.inroom);
            console.log("inroom : " + data);
            socket.inroom = data;
            socket.join(data);
        });

        socket.on('data',function(data){
            console.log('room [ ' + socket.inroom + '] Socket ID : '+this.id+' data :' + this.data);
            io.to(socket.rooms).emit('data',data);
        });
    });
};