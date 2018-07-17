
/**
 * 
 * @param {SocketIO.Namespace} io 
 */
function addRouter (io){
    var nameid = 0;
    var colors = [
        '#DDFFAA',
        '#95E0C8',
        '#E18060',
        '#FFCBA4'
    ];

    var users = {};
    
    io.on("connection", function (socket) {
        console.log('[Socket.IO] [' + io.namespace +'] : Connect ' + socket.id + '. now user is ' + nameid);
        users[socket.id] = {
            name: socket.handshake.query.name,
            color: colors[nameid++ % colors.length],
            ename: 'user' + nameid
        };
        socket.ename = 'user' + nameid;
        socket.color = users[socket.id].color;
        socket.name = users[socket.id].name;
        socket.on('test', function(data){
            console.log(data);
            socket.broadcast.emit('test', data);
        });
        socket.user = users[socket.id].name;
        if (io.sockets.length == 1){
            socket.emit('youking');
            users[socket.id].isking = true;
        }
        socket.emit('userdata', Object.values(users));
        socket.broadcast.emit('connected', users[socket.id]);

        socket.on('selection', function (data) {
            data.user = socket.user;
            data.color=socket.color;
            data.ename = socket.ename;
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
            data.ename = socket.ename;
            socket.broadcast.emit('key', data);
        });
        socket.on('error', function(data){
            socket.disconnect();
          })
          socket.on('forceDisconnect', function () {
            socket.disconnect();
        })
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
    return link;
};