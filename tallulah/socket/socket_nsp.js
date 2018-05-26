
/**
 * 
 * @param {SocketIO.Namespace} io 
 */
function addRouter (io){
    var nameid = 0;
    var colors = [
        'gold',
        'lightskyblue',
        'palegreen',
        'salmon'
    ];

    var users = {};
    
    io.on("connection", function (socket) {
        console.log('[Socket.IO] [' + io.namespace +'] : Connect ' + socket.id);
        users[socket.id] = {
            name: "user" + nameid,
            color: colors[nameid++ % colors.length],
            connect : false,
            rooms : "",
        };
         
        socket.user = users[socket.id].name;
        if (io.sockets.length == 1){
            users[socket.id].isking = true;
        }
        socket.emit('userdata', Object.values(users));
        socket.broadcast.emit('connected', users[socket.id]);

        socket.on('selection', function (data) {
            data.user = socket.user;
            socket.broadcast.emit('selection', data);
        }); 
        socket.on('filedata', function(data){
            socket.broadcast.emit('resetdata', data);
        });      
        socket.on('disconnect', function (data) {
            console.log('[Socket.IO] ['+ io.namespace +'] : disConnect ' + socket.id);
            socket.broadcast.emit("exit", users[socket.id].name);
            delete users[socket.id];
        });
        socket.on('key', function (data) {
            data.user = data.user;
            socket.broadcast.emit('key', data);
        });

    });
};

/**
 * 
 * @param {SocketIO.Server} io 
 * @param {String} router router link
 */
module.exports = function (io, router){
    var link = io.of(router);
    link.namespace = router;
    addRouter(link);
};