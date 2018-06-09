/**
 * 
 * @param {SocketIO.Server} io 
 */
module.exports=function(io){
    io.on('connection',function(socket){
        socket.roomNum=1;
        socket.join(socket.roomNum);
        // socket.on('changeRoom',function(data){
        //     console.log(`ChangeRoom to ${data}`);
        //     socket.leave(socket.roomNum);
        //     socket.roomNum=data;
        //     socket.join(socket.roomNum);
        // });

        socket.on('join',function(data){
            console.log(data+'님이 입장하셨습니다.');
            io.to(socket.roomNum).emit('join',data+'님이 입장하셨습니다.\n');
        });

        socket.on('data',function(data){
            console.log(data);
            io.emit('data',data);
        });
    });
};