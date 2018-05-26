/**
 * 
 * @param {SocketIO.Server} io 
 */

module.exports=function(io){
    io.on('connection',function(socket){//성공적으로 연결되었을시
        console.log('socket connected: '+socket.id);
        socket.inroom=1;
        socket.join(socket.inroom);
        socket.on('room',function(data){
            console.log('Entering Room to '+data+'....');
            socket.leave(socket.inroom);
            socket.inroom=data;
            socket.join(socket.inroom);
        });

        socket.on('data',function(data){
            console.log('Socket ID:'+this.id+' data :'+data);
            io.to(socket.inroom).emit('data',data);
        })
    });
};