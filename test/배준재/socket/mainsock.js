/**
 * 
 * @param {SocketIO.Server} io 
 */

module.exports=function(io){
    io.on('connection',function(socket){
        console.log('socket connected: '+socket.id);
        socket.on('data',function(data){
            console.log('Socket ID:'+this.id+' data :'+data);
            io.emit('data',data);
        })
    });
};