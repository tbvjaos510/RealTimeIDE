/**
 * 
 * @param {SocketIO.Server} io 
 */
module.exports=function(io){
    io.on('connection',function(socket){
        socket.roomNum=1;
        socket.join(socket.roomNum);
        socket.on('changeRoom',function(data){
            console.log(`ChangeRoom to ${data}`);
            socket.leave(socket.roomNum);
            socket.roomNum=data;
            socket.join(socket.roomNum);
        });

        socket.on('join',function(data){
            io.to(socket.roomNum).emit('join','One Person Enter\n');
        });
    });
};